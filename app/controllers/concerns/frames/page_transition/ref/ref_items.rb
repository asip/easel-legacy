# Frames::PageTransition::Ref::RefItems class
class Frames::PageTransition::Ref::RefItems
  def self.build(ref_items:)
    query_map = self.new(ref_items:)
    query_map.build_items
  end

  def build_items
    from = ref_items&.fetch(:from, nil)
    if ref_items.blank? || (from.blank?)
      ref_items[:from] = "frame"
    end
    ref_items
  end

  private

  attr_accessor :ref_items

  def initialize(ref_items:)
    self.ref_items = ref_items
  end
end
