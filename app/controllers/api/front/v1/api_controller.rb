# frozen_string_literal: true

module Api
  module Front
    module V1
      # Api Controller
      class ApiController < ActionController::API
        include Locale::AutoDetect
        include Api::ExceptionHandler

        # protect_from_forgery with: :null_session

        before_action :switch_locale
        before_action :authenticate

        protected

        def authenticate
          login_from_jwt
          @current_user = nil unless @current_user && @current_user.token == token

          raise(Api::ExceptionHandler::UnauthorizedError) if @current_user.nil?
        end

        attr_reader :current_user
      end
    end
  end
end
