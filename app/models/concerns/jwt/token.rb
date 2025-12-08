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
      Jwt::Token.create_token_from(user: self)
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

    class_methods do
      def find_from(token:)
        payload = Jwt::Token.decode_token(token)
        # puts payload
        user_id = payload[:sub]
        User.find(user_id)
      end
    end

    def self.decode_token(token)
      secret_key = Rails.application.secret_key_base
      decoded_token = JWT.decode(token, secret_key, true, { algorithm: "HS256" })
      decoded_token[0].with_indifferent_access
    end

    private

    def self.create_token_from(user:)
      payload = { sub: user.id, exp: (60.minutes.from_now).to_i }
      secret_key = Rails.application.secret_key_base
      token = JWT.encode(payload, secret_key, "HS256")
      token
    end
  end
end
