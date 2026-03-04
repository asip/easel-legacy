# frozen_string_literal: true

# Frames::PageTransition::Ref module
module Frames::PageTransition::Ref
  extend ActiveSupport::Concern

  include PageTransition::Query::Ref

  protected

  def query_map
    @query_map ||= QueryMap.build(ref_items: ref_items_for_user)
  end

  def back_to_path
    @back_to_path ||= BackToPath.build(
      ref:, root_path: root_path(query_map_for_search),
      prev_url:, page:, action_name:
    )
  end

  def ref_items_for_user
    @ref_items_for_user ||= RefItems.build(ref_items: Json::Util.to_hash(ref))
  end
end
