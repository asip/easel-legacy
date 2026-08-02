# frozen_string_literal: true

# Confirmable module
module Confirmable
  extend ActiveSupport::Concern

  included do
    before_action :set_model, only: %i[new create edit update]
    before_action :back_to_form, only: %i[create update]
  end
end
