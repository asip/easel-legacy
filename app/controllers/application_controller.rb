# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::Base
  include Locale::Detect
  include TimeZone::Detect
  include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
  include Flashes
  include PageTransition::Location
  include ::ResourceRenderable
  include ::ErrorRenderable
  include Account::Authentication
  include Cookie

  protect_from_forgery with: :exception
end
