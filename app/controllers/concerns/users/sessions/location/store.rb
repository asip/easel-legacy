# frozen_string_literal: true

# Users::Sessions::Location::Store module
module Users::Sessions::Location::Store
  extend ActiveSupport::Concern
  include PageTransition::Location::Store

  SKIP_ACTION_LIST_FOR_LOCATION = [ :new ]

  included do
    before_action :store_location, only: SKIP_ACTION_LIST_FOR_LOCATION
  end

  private

  def saved_pages?
    PageTransition::Location::Path.saved_before_login?(from)
  end
end
