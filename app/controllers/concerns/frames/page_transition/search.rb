# frozen_string_literal: true

# Frames::PageTransition::Search module
module Frames::PageTransition::Search
  extend ActiveSupport::Concern
  include PageTransition::Query::Search

  protected

  def query_map_for_search
    @query_map_for_search ||= QueryMap.build(ref_items: query_map.ref_items)
  end
end
