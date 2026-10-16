# frozen_string_literal: true

# api controller
class Api::V1::ApiController < Vesper::Api::AppController
  include ActionController::Cookies
  include Locale::Detect
  include TimeZone::Detect
  include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
  include Api::Resource::Renderable
  include Api::Account::Authentication
  include Api::Session
  include Jwt::Refresh
end
