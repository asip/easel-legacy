# frozen_string_literal: true

# Page Module
module Page
  # Confirmable Module
  module Confirmable
    extend ActiveSupport::Concern

    included do
      attr_accessor :confirming

      validates :confirming, acceptance: true

      after_validation :check_confirming
    end

    protected

    def check_confirming
      errors.delete(:confirming)
      self.confirming = errors.empty? ? 'true' : ''
      return unless errors[:file].empty? || errors[:image].empty?

      # Rails.logger.debug self.class
      attach_derivatives
    end

    def attach_derivatives
      case self.class.to_s
      when 'Frame'
        file_derivatives! if file.present?
      when 'User'
        image_derivatives! if image.present?
      end
    end
  end
end
