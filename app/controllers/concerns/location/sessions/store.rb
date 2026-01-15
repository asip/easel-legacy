# frozen_string_literal: true

# location/sessions/Store module
module Location::Sessions::Store
  extend ActiveSupport::Concern

  included do
    before_action :store_location, only: [ :show ]
  end

  protected

  def store_location
    from = request.referer
    if PageTransition::Path.not_unsaved_paths_after_login?(from)
      path = root_path
      if from&.include?("/frame") && from&.include?("profile")
        self.prev_url = path
      else
        self.prev_url = from || path
      end
    end
  end
end
