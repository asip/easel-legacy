# Users::PageTransition::Ref::RefItems class
class Users::PageTransition::Ref::RefItems
  def self.build(ref_items:)
    query_map = self.new(ref_items:)
    query_map.build_items
  end

  def build_items
    ref_items.delete(:from)
    ref_items
  end

  private

  attr_accessor :ref_items

  def initialize(ref_items:)
    self.ref_items = ref_items
  end
end
