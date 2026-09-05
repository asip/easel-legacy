# frozen_string_literal: true

# Frames::PageTransition::Search module
module Frames::PageTransition::Search
  extend ActiveSupport::Concern
  include PageTransition::Query::Search

  protected

  def search_query_map
    @search_query_map ||= ::PageTransition::Frames::Search::QueryMap.build(ref_items: cookie_query_map.ref_items)
  end
end
