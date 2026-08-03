# frozen_string_literal: true

# Frames::PageTransition::Ref module
module Frames::PageTransition::Ref
  extend ActiveSupport::Concern

  include PageTransition::Query::Ref

  protected

  def query_map
    @query_map ||= QueryMap.build(ref_items: ref_items_for_next)
  end

  def back_to_path
    @back_to_path ||= BackToPath.build(
      query_map: cookie_query_map, root_path: root_path(query_map_for_search),
      prev_url: location.prev_url, action_name:
    )
  end

  def ref_items_for_next
    @ref_items_for_next ||= RefItems.build(ref_items: JsonUtil.to_hash(query_map.ref))
  end
end
