# frozen_string_literal: true

# users / Omniauth Callbacks Controller
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  protect_from_forgery except: :google_oauth2
  # skip_before_action :verify_authenticity_token, only: :google_oauth2
  before_action :verify_g_csrf_token

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  def google_oauth2
    callback_for(:google)
  end

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  private

  def auth_params
    @auth_params ||= params.permit(
      :authenticity_token, :g_csrf_token, :provider, :credential
    ).to_h
  end

  def callback_for(provider)
    auth = User.auth_from(provider:, credential: auth_params[:credential])
    user = User.from(auth:, time_zone: cookies[:time_zone])

    if user.persisted?
      sign_in_and_redirect user, event: :authentication
      set_flash_message(:notice, :success, kind: provider.to_s.capitalize) if is_navigational_format?

      user.assign_token(user.create_token)
      cookies[:access_token] = { value: user.token }
      # puts user.token
    else
      session["devise.#{provider}_data"] = request.env["omniauth.auth"].except(:extra)
      redirect_to login_path
    end
  end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end

  private

  def verify_g_csrf_token
    g_csrf_token_ = cookies["g_csrf_token"]
    g_csrf_token = auth_params[:g_csrf_token]

    if g_csrf_token_.blank? || g_csrf_token.blank? || g_csrf_token_ != g_csrf_token
      redirect_to login_path
    end
  end
end
