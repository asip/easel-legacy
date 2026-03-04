# Frames::PageTransition::Ref::RefItems class
class Frames::PageTransition::Ref::RefItems
  def self.build(ref:)
    query_map = self.new(ref:)
    query_map.build_items
  end

  def build_items
    items = Json::Util.to_hash(ref)
    if items.blank? || (items.present? && items[:from].blank?)
      items[:from] = "frame"
    end
    items
  end

  private

  attr_accessor :ref

  def initialize(ref:)
    self.ref = ref
  end
end
