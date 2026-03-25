# frozen_string_literal: true

# Frames::Location::Store module
module Frames::Location::Store
  extend ActiveSupport::Concern

  included do
    before_action :store_location, only: %i[show new edit]
  end

  protected

  def store_location
    self.prev_url = from || root_path(query_map_for_search) if saved
  end

  private

  def saved
    (action_name == "show" && !from&.include?("/frames") &&
    PageTransition::Path.saved_paths_before_login?(from)) ||
    ((action_name == "new" || (action_name == "edit" && !from.include?(request.path))) &&
    PageTransition::Path.saved_paths_after_login?(from))
  end
end
