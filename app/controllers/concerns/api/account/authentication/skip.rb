# frozen_string_literal: true

# Api::Account::Authentication::Skip module
module Api::Account::Authentication::Skip
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate
  end
end
