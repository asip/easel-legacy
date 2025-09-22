# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::Base
  include Locale::AutoDetect
  include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
  include Flashes

  protect_from_forgery with: :exception

  before_action :set_time_zone
  before_action :authenticate_user!

  helper_method :current_user

  private

  def set_time_zone
    # puts cookies.to_h
    # puts cookies[:time_zone]
    Time.zone = cookies[:time_zone]
  end

  protected

  def after_sign_out_path_for(_resource_or_scope)
    root_path
  end
end
