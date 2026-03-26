# frozen_string_literal: true

# Account::Passwords::Location::Store module
module Account::Passwords::Location::Store
  extend ActiveSupport::Concern
  include PageTransition::Location::Store

  included do
    before_action :store_location, only: [ :edit ]
  end

  private

  def saved_page?
    !from&.include?("/account/password/edit")
  end

  def fallback
    profile_path
  end
end
