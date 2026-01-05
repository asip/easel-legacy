# frozen_string_literal: true

# api
module Api
  # front
  module Front
    # v1
    module V1
      # Api Controller
      class ApiController < ActionController::API
        include ActionController::Cookies
        include Locale::Detect
        include TimeZone::Detect
        include NPlusOne::Query::Detection unless Rails.env.production? || Rails.env.test?
        include Api::ErrorRenderable
        include Api::Account::Authentication
      end
    end
  end
end
