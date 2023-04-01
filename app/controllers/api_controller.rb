# frozen_string_literal: true

# Api Controller
class ApiController < ActionController::API
  include Locale::AutoDetect
  # protect_from_forgery with: :null_session

  rescue_from StandardError,
              with: ->(e) { render_error(e) }

  before_action :switch_locale
  before_action :authenticate

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
end
