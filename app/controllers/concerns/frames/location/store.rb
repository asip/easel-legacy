# frozen_string_literal: true

# Frames::Location::Store module
module Frames::Location::Store
  extend ActiveSupport::Concern
  include PageTransition::Location::Store

  SKIP_ACTION_LIST_FOR_LOCATION = %i[show new edit]

  included do
    before_action :store_location, only: SKIP_ACTION_LIST_FOR_LOCATION
  end

  private

  def saved_pages?
    (action_name == "show" && !from&.include?("/frames") &&
    PageTransition::Location::Path.saved_before_login?(from)) ||
    ((action_name == "new" || (action_name == "edit" && !from.include?(request.path))) &&
    PageTransition::Location::Path.saved_after_login?(from))
  end

  def fallback
    root_path(Frame.search_query_map(ref_items: cookie_query_map.ref_items))
  end
end
