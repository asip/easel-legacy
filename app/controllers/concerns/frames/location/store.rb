# frozen_string_literal: true

# Frames::Location::Store module
module Frames::Location::Store
  extend ActiveSupport::Concern
  include PageTransition::Location::Store

  included do
    before_action :store_location, only: %i[show new edit]
  end

  private

  def saved_pages?
    (action_name == "show" && !from&.include?("/frames") &&
    PageTransition.saved_paths_before_login?(from)) ||
    ((action_name == "new" || (action_name == "edit" && !from.include?(request.path))) &&
    PageTransition.saved_paths_after_login?(from))
  end

  def fallback
    root_path(search_query_map)
  end
end
