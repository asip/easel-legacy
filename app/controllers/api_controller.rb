class ApiController < ApplicationController

  rescue_from StandardError,
    with: lambda { |e| render_error(e) }

  def render_error(exception)
    status_code = ActionDispatch::ExceptionWrapper.new(Rails.env, exception).status_code
    render json: {message: exception.message, status: status_code},
      status: status_code
  end

  protected

  def not_authenticated
    render json: {message: 'unauthorized', status: :unauthorized}, status: :unauthorized
  end
end