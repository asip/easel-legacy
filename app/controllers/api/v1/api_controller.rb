# frozen_string_literal: true

# Api
module Api
  # V1
  module V1
    # Api Controller
    class ApiController < ActionController::Base
      protect_from_forgery with: :exception

      rescue_from StandardError,
                  with: ->(e) { render_error(e) }

      before_action :authenticate
      skip_before_action :verify_authenticity_token

      def render_error(exception)
        status_code = ActionDispatch::ExceptionWrapper.new(Rails.env, exception).status_code
        render json: { message: exception.message, status: status_code },
               status: status_code
      end

      protected

      def authenticate
        login_from_jwt
        @current_user = nil unless @current_user && @current_user.token == token
        @current_user.present?
      end

      def logged_in?
        current_user.present?
      end

      attr_reader :current_user

      # def set_csrf_token
      #   response.set_header('X-CSRF-Token', form_authenticity_token)
      # end
    end
  end
end
