# frozen_string_literal: true

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

  def callback_for(provider)
    auth = {}
    auth[:info] = Google::Auth::IDTokens.verify_oidc(params["credential"],
                                          aud: Settings.google.client_id)
    auth[:uid] = auth[:info]["sub"]
    auth[:provider] = provider

    # puts auth

    user = User.from_omniauth(auth)

    if user.persisted?
      sign_in_and_redirect user, event: :authentication
      set_flash_message(:notice, :success, kind: provider.to_s.capitalize) if is_navigational_format?

      user.assign_token(user.create_token)
      cookies.permanent[:access_token] = { value: user.token }
      puts user.token
    else
      session["devise.#{provider}_data"] = request.env["omniauth.auth"].except(:extra)
      redirect_to new_user_registration_url
    end
  end

  def auth_params
    params.permit(:provider, :credential)
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
end
