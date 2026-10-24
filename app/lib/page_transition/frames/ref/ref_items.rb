# PageTransition::Frames::Ref::RefItems class
class PageTransition::Frames::Ref::RefItems
  def self.build(ref_items:)
    items = ::RefItems.new(ref_items)
    if to_h(items).blank? || items.from.blank?
      items.from = "frame"
    end
    items.to_h
  end

  def self.to_h(items)
    items.to_h
  end
end
