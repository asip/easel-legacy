# frozen_string_literal: true

# admin controller
class Admins::ApplicationController < ActionController::Base
  include Locale::Detect
  # include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
  include Flashes
  include Admin::Authentication

  protect_from_forgery with: :exception
end
