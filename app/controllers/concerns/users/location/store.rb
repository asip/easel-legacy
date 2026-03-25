# frozen_string_literal: true

# Users::Location::Store module
module Users::Location::Store
  extend ActiveSupport::Concern

  included do
    before_action :store_location, only: [ :show ]
  end

  protected

  def store_location
    if !from&.include?("/users") && PageTransition::Path.saved_paths_before_login?(from) &&
       PageTransition::Path.saved_paths_after_login?(from)
      unless from&.include?("/frames") && from&.include?("user_profile")
        self.prev_url = from || root_path
      end
    end
  end
end
