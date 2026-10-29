# frozen_string_literal: true

# Frames::PageTransition::Query module
module Frames::PageTransition::Query
  extend ActiveSupport::Concern

  include PageTransition::Query

  protected

  def query_map
    @query_map ||= ::PageTransition::Frames::Query::QueryMap.build(
      ref_items: ::PageTransition::Frames::Query::RefItems.build(ref_items: JsonUtil.parse(cookie_query_map.ref))
    )
  end
end
