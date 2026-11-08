# frozen_string_literal: true

# Users::Location::Store module
module Users::Location::Store
  extend ActiveSupport::Concern
  include PageTransition::Location::Store

  SKIP_ACTION_LIST_FOR_LOCATION = [ :show ]

  included do
    before_action :store_location, only: SKIP_ACTION_LIST_FOR_LOCATION
  end

  private

  def saved_pages?
    !from&.include?("/users") && PageTransition::Location::Path.saved_before_login?(from) &&
    PageTransition::Location::Path.saved_after_login?(from) &&
    (!from&.include?("/frames") || !from&.include?("user_profile"))
  end
end
