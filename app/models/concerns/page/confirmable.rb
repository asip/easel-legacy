# frozen_string_literal: true

# Page::Confirmable module
module Page::Confirmable
  extend ActiveSupport::Concern

  included do
    attribute :confirming, :boolean, default: true

    validates :confirming, acceptance: true

    after_validation :check_confirming
  end

  protected

  def check_confirming
    errors.delete(:confirming)
    self.confirming = errors.empty? ? true : false
  end
end
