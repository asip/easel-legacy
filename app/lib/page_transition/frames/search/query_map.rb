# PageTransition::Frames::Search::QueryMap class
class PageTransition::Frames::Search::QueryMap
  def self.build(ref_items:)
    query_map = self.new(ref_items:)
    query_map.build_query
  end

  def build_query
    query = {}
    from = ref_items[:from]
    page = ref_items[:page]
    query[:page] = page if from.blank? && page.present?
    query[:ref] = JsonUtil.stringify(ref_items) if from.present?
    query
  end

  private

  attr_accessor :ref_items

  def initialize(ref_items:)
    self.ref_items = ref_items
  end
end
