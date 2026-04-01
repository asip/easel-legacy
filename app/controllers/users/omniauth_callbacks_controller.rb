# frozen_string_literal: true

# users / Omniauth Callbacks Controller
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  include Api::Session

  protect_from_forgery except: :google
  # skip_before_action :verify_authenticity_token, only: :google

  before_action :verify_g_csrf_token

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  def callback
    if user.persisted?
      login_success
    else
      login_failed
    end
  end

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end

  private

  def auth_params
    @auth_params ||= params.permit(
      :authenticity_token, :g_csrf_token, :provider, :credential
    ).to_h
  end

  def credential
    auth_params[:credential]
  end

  def provider
    auth_params[:provider]
  end

  def auth
    if provider == "google"
      AuthInfo.from_google(provider:, credential:)
    else
      nil
    end
  end

  def user
    @user ||= User.from(auth:, time_zone:)
  end


  def login_success
    sign_in_and_redirect user, event: :authentication
    set_flash_message(:notice, :success, kind: provider.to_s.capitalize) if is_navigational_format?

    # user.token = user.create_token
    # self.access_token = user.token
    self.access_token = user.create_token
  end

  def login_failed
    session["devise.#{provider}_data"] = request.env["omniauth.auth"].except(:extra)
    redirect_to login_path
  end

  def verify_g_csrf_token
    g_csrf_token_ = cookies["g_csrf_token"]
    g_csrf_token = auth_params[:g_csrf_token]

    if g_csrf_token_.blank? || g_csrf_token.blank? || g_csrf_token_ != g_csrf_token
      redirect_to login_path
    end
  end
end
