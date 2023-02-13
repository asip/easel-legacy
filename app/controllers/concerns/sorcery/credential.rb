# frozen_string_literal: true

# Search Module
module Sorcery
  # Query module
  module Credential
    extend ActiveSupport::Concern

    included do
      helper_method :sorcery_fetch_user_hash
    end

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
                                             aud: Rails.application.config.sorcery.google.key)
        @user_hash[:uid] = @user_hash[:user_info]['sub']
      else
        # delegate to the provider for the access token and the user hash.
        # cache them in instance variables.

        # sends request to oauth agent to get the token
        @access_token ||= @provider.process_callback(params, session)
        # uses the token to send another request to the oauth agent requesting user info
        @user_hash ||= @provider.get_user_hash(@access_token)
      end
      nil
    end
    # rubocop:enable Metrics/MethodLength, Metrics/AbcSize
  end
end
