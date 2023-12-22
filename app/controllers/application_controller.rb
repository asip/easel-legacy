# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::Base
  include Locale::AutoDetect
  include Query::NPlusOne::Detection unless Rails.env.production? || Rails.env.test?
  include Flashes

  protect_from_forgery with: :exception

  before_action :require_login
  before_action :token_confirmation

  protected

  def not_authenticated
    redirect_to root_path
  end

  def token_confirmation
    return if current_user.blank?

    return unless current_user&.token_expire?

    current_user.reset_token
    cookies.delete(:access_token)
    logout
  end
end
