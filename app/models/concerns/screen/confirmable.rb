# frozen_string_literal: true

# Screen Module
module Screen
  # Confirmable Module
  module Confirmable
    extend ActiveSupport::Concern

    included do
      attr_accessor :confirming

      validates_acceptance_of :confirming

      after_validation :check_confirming
    end

    protected

    def check_confirming
      errors.delete(:confirming)
      self.confirming = errors.empty? ? 'true' : ''
    end
  end
end
