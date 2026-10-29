# PageTransition::Users::Query::RefItems class
class PageTransition::Users::Query::RefItems
  def self.build(ref_items:)
    items = ::RefItems.new(ref_items)
    items.from = nil
    items.to_h
  end
end
