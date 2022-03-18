module Screen
  module Confirmable
    extend ActiveSupport::Concern

    included do
      validates_acceptance_of :confirming

      after_validation :check_confirming
    end

    protected

    def check_confirming
      errors.delete(:confirming)
      self.confirming = errors.empty? ? "true" : ""
    end
  end
end
