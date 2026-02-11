# frozen_string_literal: true

# api controller
class Front::Api::V1::ApiController < ActionController::API
  include ActionController::Cookies
  include Locale::Detect
  include TimeZone::Detect
  include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
  include Api::ErrorRenderable
  include Api::Account::Authentication
end
