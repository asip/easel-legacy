# frozen_string_literal: true

# PageLocation::Store module
module PageLocation::Store
  extend ActiveSupport::Concern

  def store_location
    self.prev_url = from || fallback if saved
  end

  protected

  def saved
    false
  end

  def fallback
    root_path
  end
end
