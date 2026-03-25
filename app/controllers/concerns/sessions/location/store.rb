# frozen_string_literal: true

# Sessions::Location::Store module
module Sessions::Location::Store
  extend ActiveSupport::Concern

  included do
    before_action :store_location, only: [ :show ]
  end

  protected

  def store_location
    if PageTransition::Path.saved_paths_after_login?(from)
      if from&.include?("/frame") && from&.include?("profile")
        self.prev_url = root_path
      else
        self.prev_url = from || root_path
      end
    end
  end
end
