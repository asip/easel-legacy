# frozen_string_literal: true

# location/frames/Store module
module Location::Frames::Store
  extend ActiveSupport::Concern

  included do
    before_action :store_location, only: %i[show new edit]
  end

  protected

  def store_location
    from = request.referer
    if (action_name == "show" && !from&.include?("/frames") && PageTransition::Path.not_before_login_unsaved_paths?(from)) ||
       ((action_name == "new" || (action_name == "edit" && !from.include?(request.path))) &&
        PageTransition::Path.not_after_login_unsaved_paths?(from))
      self.prev_url = from || root_path(query_map_for_search)
    end
  end
end
