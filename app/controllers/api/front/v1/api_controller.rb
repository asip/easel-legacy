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
          login_from_jwt
          @current_user.assign_token(token) if @current_user
          @current_user = nil unless @current_user && !@current_user.token_expire?

          raise(Api::ExceptionHandler::UnauthorizedError) if @current_user.nil?
        end

        attr_reader :current_user
      end
    end
  end
end
