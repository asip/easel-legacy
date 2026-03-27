# frozen_string_literal: true

# Users::Registrations::ParameterConfiguration module
module Users::Registrations::ParameterConfiguration
  extend ActiveSupport::Concern

  included do
    before_action :configure_sign_up_params, only: [ :create ]
    before_action :configure_account_update_params, only: [ :update ]
  end
end
