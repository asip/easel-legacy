class ApiController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  # protect_from_forgery with: :null_session

  rescue_from StandardError,
    with: lambda { |e| render_error(e) }

  # skip_before_action :require_login
  before_action :authenticate

  def render_error(exception)
    status_code = ActionDispatch::ExceptionWrapper.new(Rails.env, exception).status_code
    render json: {message: exception.message, status: status_code},
           status: status_code
  end

  protected

  def authenticate
    authenticate_or_request_with_http_token do |token, options|
      login_from_jwt
      current_user.present?
    end
  end

  def logged_in?
    current_user.present?
  end
end
