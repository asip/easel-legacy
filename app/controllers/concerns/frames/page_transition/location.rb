# frozen_string_literal: true

# Frames::PageTransition::Location module
module Frames::PageTransition::Location
  extend ActiveSupport::Concern

  protected

  def back_to_path
    @back_to_path ||= ::PageTransition::Frames::Location::BackToPath.build(
      query_map: cookie_query_map, root_path: root_path(search_query_map),
      prev_url: location.prev_url, action_name:
    )
  end
end
