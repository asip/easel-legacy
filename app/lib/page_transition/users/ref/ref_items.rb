# PageTransition::Users::Ref::RefItems class
class PageTransition::Users::Ref::RefItems
  def self.build(ref_items:)
    items = self.new(ref_items:)
    items.build
  end

  def build
    ref_items.delete(:from)
    ref_items
  end

  private

  attr_accessor :ref_items

  def initialize(ref_items:)
    self.ref_items = ref_items
  end
end
