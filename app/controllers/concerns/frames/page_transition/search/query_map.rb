# Frames::PageTransition::Search::QueryMap class
class Frames::PageTransition::Search::QueryMap
  def self.build(ref_items:)
    query_map = self.new(ref_items:)
    query_map.build_query
  end

  def build_query
    query = {}
    items_from = ref_items[:from]
    items_page = ref_items[:page]
    query[:page] = items_page if items_from.blank? && items_page.present?
    query[:ref] = Oj.dump(ref_items) if items_from.present?
    query
  end

  private

  attr_accessor :ref_items

  def initialize(ref_items:)
    self.ref_items = ref_items
  end
end
