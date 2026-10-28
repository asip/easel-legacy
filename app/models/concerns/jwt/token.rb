# frozen_string_literal: true

# Jwt::Token module
module Jwt::Token
  extend ActiveSupport::Concern

  # included do
  #   attr_reader :token
  # end

  def create_token
    JwtUtil.create_token_from(user: self)
  end

  # def token=(token_)
  #   @token = token_
  # end

  # def update_token
  #   # return unless saved_change_to_email?
  # end

  class_methods do
    def find_from(token:)
      payload = JwtUtil.decode_token(token)
      # puts payload
      user_id = payload[:sub]
      User.find(user_id)
    end
  end
end
