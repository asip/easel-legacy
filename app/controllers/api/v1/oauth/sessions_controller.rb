# frozen_string_literal: true

# Api
module Api
  # V1
  module V1
    module Oauth
      # Oauth Sessions Controller
      class SessionsController < Api::V1::ApiController
        # protect_from_forgery except: :callback

        skip_before_action :authenticate

        # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
        def create
          provider = auth_params[:provider]

          if (@user = login_from(provider))
            @user.assign_token(user_class.issue_token(id: @user.id, email: @user.email))
          else
            @user = create_from(provider)
            reset_session
            @user.assign_token(user_class.issue_token(id: @user.id, email: @user.email))
            auto_login(@user)
          end
          cookies.permanent[:access_token] = @user.token
          render json: AccountSerializer.new(@user).serializable_hash
        end
        # rubocop:enable Metrics/AbcSize, Metrics/MethodLength

        private

        # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
        def sorcery_fetch_user_hash(provider_name)
          provider = sorcery_get_provider provider_name
          if @provider.nil? || @provider != provider
            @provider = provider
            @access_token = nil
            @user_hash = nil
          end

          if provider_name == 'google' && auth_params[:credential].present?
            @user_hash = {}
            @user_hash[:user_info] =
              Google::Auth::IDTokens.verify_oidc(auth_params[:credential],
                                                 aud: Rails.application.credentials.dig(:google, :client_id))
            @user_hash[:uid] = @user_hash[:user_info]['sub']
          else
            # sends request to oauth agent to get the token
            @access_token ||= @provider.process_callback(params, session)
            # uses the token to send another request to the oauth agent requesting user info
            @user_hash ||= @provider.get_user_hash(@access_token)
          end
          nil
        end
        # rubocop:enable Metrics/MethodLength, Metrics/AbcSize

        def auth_params
          params.permit(:provider, :credential)
        end
      end
    end
  end
end
