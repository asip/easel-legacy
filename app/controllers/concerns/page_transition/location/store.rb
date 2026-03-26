# frozen_string_literal: true

# PageTransition::Location::Store module
module PageTransition::Location::Store
  extend ActiveSupport::Concern

  def store_location
    self.prev_url = from || fallback if saved_page?
  end

  protected

  def saved_page?
    false
  end

  def fallback
    root_path
  end
end
