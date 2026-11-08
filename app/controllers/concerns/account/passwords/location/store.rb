# frozen_string_literal: true

# Account::Passwords::Location::Store module
module Account::Passwords::Location::Store
  extend ActiveSupport::Concern
  include PageTransition::Location::Store

  SKIP_ACTION_LIST_FOR_LOCATION = [ :edit ]

  included do
    before_action :store_location, only: SKIP_ACTION_LIST_FOR_LOCATION
  end

  private

  def saved_pages?
    !from&.include?("/account/password/edit")
  end

  def fallback
    profile_path
  end
end
