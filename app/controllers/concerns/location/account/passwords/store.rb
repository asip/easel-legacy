# frozen_string_literal: true

# location/account/passwords/Store module
module Location::Account::Passwords::Store
  extend ActiveSupport::Concern

  included do
    before_action :store_location, only: [ :edit ]
  end

  def store_location
    from = request.referer
    self.prev_url = from || profile_path  if !from&.include?("/account/password/edit")
  end
end
