# frozen_string_literal: true

# api
module Api
  # front
  module Front
    # v1
    module V1
      # Api Controller
      class ApiController < ActionController::API
        include Locale::AutoDetect
        include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
        include Api::ExceptionHandler

        # protect_from_forgery with: :null_session

        before_action :authenticate

        protected

        def authenticate
          authorization_header = request.headers["Authorization"]
          # puts authorization_header
          if !authorization_header
            render_unauthorized
          else
            token = authorization_header.split(" ")[1]
            secret_key = Rails.application.credentials.secret_key_base

            begin
              decoded_token = JWT.decode(token, secret_key)
              # puts "user_id:" + decoded_token[0]["user_id"].to_s
              @current_user = User.find(decoded_token[0]["user_id"])
              @current_user.assign_token(token)
            rescue ActiveRecord::RecordNotFound
              render_unauthorized
            rescue JWT::ExpiredSignature
              render_unauthorized
            rescue JWT::DecodeError
              render_unauthorized
            end
          end
        end

        def render_unauthorized
          raise(Api::ExceptionHandler::UnauthorizedError) if @current_user.nil?
        end

        attr_reader :current_user
      end
    end
  end
end
