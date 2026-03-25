# frozen_string_literal: true

# Users::Location::Store module
module Users::Location::Store
  extend ActiveSupport::Concern
  include PageLocation::Store

  included do
    before_action :store_location, only: [ :show ]
  end

  private

  def saved_page?
    !from&.include?("/users") && PageTransition::Path.saved_paths_before_login?(from) &&
    PageTransition::Path.saved_paths_after_login?(from) &&
    (!from&.include?("/frames") || !from&.include?("user_profile"))
  end
end
