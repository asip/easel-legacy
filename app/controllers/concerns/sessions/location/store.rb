# frozen_string_literal: true

# Sessions::Location::Store module
module Sessions::Location::Store
  extend ActiveSupport::Concern
  include PageTransition::Location::Store

  included do
    before_action :store_location, only: [ :show ]
  end

  protected

  def store_location
    if PageTransition.saved_paths_after_login?(from)
      if saved_page?
        self.prev_url = from || fallback
      else
        self.prev_url = fallback
      end
    end
  end

  private

  def saved_page?
    !from&.include?("/frames") || !from&.include?("profile")
  end
end
