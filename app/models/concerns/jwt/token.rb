# frozen_string_literal: true

# jwt
module Jwt
  # Token module
  module Token
    extend ActiveSupport::Concern

    included do
      attr_reader :token
    end

    def create_token
      payload = { user_id: self.id, exp: (DateTime.current + 60.minutes).to_i }
      secret_key = Rails.application.credentials.secret_key_base
      token = JWT.encode(payload, secret_key)
      token
    end

    def assign_token(token_)
      @token = token_
    end

    def update_token
      # return unless saved_change_to_email?
    end

    def reset_token
      @token = nil
    end
  end
end
