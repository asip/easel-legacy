# PageTransition::Frames::Ref::RefItems class
class PageTransition::Frames::Ref::RefItems
  def self.build(ref_items:)
    items = ::RefItems.new(ref_items)
    if items.to_h.blank? || items.from.blank?
      items.from = "frame"
    end
    items.to_h
  end
end
