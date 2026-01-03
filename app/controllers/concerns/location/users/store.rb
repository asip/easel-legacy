# frozen_string_literal: true

# location/users/Store module
module Location::Users::Store
  extend ActiveSupport::Concern

  included do
    before_action :store_location, only: [ :show ]
  end

  protected

  def store_location
    from = request.referer
    if !from&.include?("/users") && PageTransition::Path.not_before_login_unsaved_paths?(from) &&
       PageTransition::Path.not_after_login_unsaved_paths?(from)
      path = root_path
      unless from&.include?("/frames") && from&.include?("user_profile")
        self.prev_url = from || path
      end
    end
  end
end
