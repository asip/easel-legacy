# frozen_string_literal: true

# users / Omniauth Callbacks Controller
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  skip_before_action :verify_authenticity_token, only: :google_oauth2

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
    params.permit(:provider, :credential).to_h
  end

  def callback_for(provider)
    auth = {}
    auth[:info] = Google::Auth::IDTokens.verify_oidc(auth_params[:credential],
                                                     aud: Settings.google.client_id)
                                        .with_indifferent_access
    auth[:uid] = auth[:info][:sub]
    auth[:provider] = provider
    auth[:time_zone] = cookies[:time_zone]

    # puts auth

    user = User.from(auth:)

    if user.persisted?
      sign_in_and_redirect user, event: :authentication
      set_flash_message(:notice, :success, kind: provider.to_s.capitalize) if is_navigational_format?

      user.assign_token(user.create_token)
      cookies[:access_token] = { value: user.token }
      # puts user.token
    else
      session["devise.#{provider}_data"] = request.env["omniauth.auth"].except(:extra)
      redirect_to new_user_registration_url
    end
  end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
end
