# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::Base
  include Device::Detect
  include Locale::Detect
  include TimeZone::Detect
  include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
  include PageTransition::Location
  include Stream::Renderable
  include Stream::ErrorRenderable
  include Account::Authentication
  include Device
  include ::Cookies
  include Api::Session
  include Jwt::Refresh

  protect_from_forgery with: :exception
end
