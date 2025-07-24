# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::Base
  include Locale::AutoDetect
  include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
  include Flashes

  protect_from_forgery with: :exception

  before_action :authenticate_user!

  helper_method :current_user

  private

  protected

  def after_sign_out_path_for(_resource_or_scope)
    root_path
  end
end
