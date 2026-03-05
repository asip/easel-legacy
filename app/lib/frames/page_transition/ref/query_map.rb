# Frames::PageTransition::Ref::QueryMap class
class Frames::PageTransition::Ref::QueryMap
  def self.build(ref_items:)
    query_map = self.new(ref_items:)
    query_map.build_query
  end

  def build_query
    query = {}
    query[:ref] = Oj.dump(ref_items) if ref_items.present?
    query
  end

  private

  attr_accessor :ref_items

  def initialize(ref_items:)
    self.ref_items = ref_items
  end
end
