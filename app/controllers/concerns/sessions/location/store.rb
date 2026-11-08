# frozen_string_literal: true

# Sessions::Location::Store module
module Sessions::Location::Store
  extend ActiveSupport::Concern
  include PageTransition::Location::Store

  SKIP_ACTION_LIST_FOR_LOCATION = [ :show ]

  included do
    before_action :store_location, only: SKIP_ACTION_LIST_FOR_LOCATION
  end

  protected

  def store_location
    if PageTransition::Location::Path.saved_after_login?(from)
      self.location.prev_url = if saved_pages?
        from || fallback
      else
        fallback
      end
    end
  end

  private

  def saved_pages?
    !from&.include?("/frames") || !from&.include?("profile")
  end
end
