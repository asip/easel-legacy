# PageTransition::Frames::Ref::RefItems class
class PageTransition::Frames::Ref::RefItems
  def self.build(ref_items:)
    items = self.new(ref_items:)
    items.build
  end

  def build
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
