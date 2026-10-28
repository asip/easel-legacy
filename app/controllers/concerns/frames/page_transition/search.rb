# frozen_string_literal: true

# Frames::PageTransition::Search module
module Frames::PageTransition::Search
  extend ActiveSupport::Concern
  include PageTransition::Query::Search

  protected

  def search_query_map
    @search_query_map ||= Frame.search_query_map(ref_items: cookie_query_map.ref_items)
  end
end
