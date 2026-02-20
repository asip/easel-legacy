# frozen_string_literal: true

# Frames::PageTransition::Search module
module Frames::PageTransition::Search
  extend ActiveSupport::Concern
  include PageTransition::Query::Search

  protected

  def query_map_for_search
    @query_map_for_search ||= Frames::PageTransition::Search.query_map_for_search(ref_items:)
  end

  private

  def self.query_map_for_search(ref_items:)
    query = {}
    items_from = ref_items[:from]
    items_page = ref_items[:page]
    query[:page] = items_page if items_from.blank? && items_page.present?
    query[:ref] = Oj.dump(ref_items) if items_from.present?
    query
  end
end
