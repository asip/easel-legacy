module Api
  module ExceptionHandler
    extend ActiveSupport::Concern

    included do
      rescue_from StandardError, with: ->(e) { render_500(e) }
      rescue_from ActiveRecord::RecordNotFound, with: ->(e) { render_404(e) }
      rescue_from UnauthorizedError, with: ->(e) { render_401(e) }
    end

    class UnauthorizedError < StandardError
    end

    protected

    def render_400(exception = nil, messages = nil)
      render_error(400, 'Bad Request', exception&.message, *messages)
    end

    def render_401(exception = nil, messages = nil)
      render_error(402,'Unauthorized', exception&.message, *messages)
    end

    def render_404(exception = nil, messages = nil)
      render_error(404, 'Not Found', exception&.message, *messages)
    end

    def render_500(exception = nil, messages = nil)
      render_error(500, 'Internal Server Error', exception&.message, *messages)
    end

    def render_error(code, message, *error_messages)
      response = {
        message: message,
        errors: error_messages.compact
      }

      render json: response, status: code
    end
  end
end
