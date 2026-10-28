# frozen_string_literal: true

# JwtUtil class
class JwtUtil
  def self.decode_token(token)
    secret_key = Rails.application.secret_key_base
    decoded_token = JWT.decode(token, secret_key, true, { algorithm: "HS256" })
    decoded_token[0].with_indifferent_access
  end

  def self.create_token_from(user:)
    payload = { sub: user.id, iat: Time.current.to_i }
    secret_key = Rails.application.secret_key_base
    token = JWT.encode(payload, secret_key, "HS256")
    token
  end
end
