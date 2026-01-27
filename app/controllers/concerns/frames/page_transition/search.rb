# frozen_string_literal: true

# Frames::PageTransition::Search module
module Frames::PageTransition::Search
  extend ActiveSupport::Concern
  include PageTransition::Query::Search

  protected

  def query_map_for_search
    @query_map_for_search ||= ->() {
      Frames::PageTransition::Search.query_map_for_search(ref_items:)
    }.call
  end

  def self.query_map_for_search(ref_items:)
    query = {}
    items_from = ref_items[:from]
    items_page = ref_items[:page]
    query[:page] = items_page if items_from.blank? && items_page.present?
    query[:ref] = ref_items.to_json if items_from.present?
    query
  end
end
