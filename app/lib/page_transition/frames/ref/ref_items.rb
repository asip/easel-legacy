# PageTransition::Frames::Ref::RefItems class
class PageTransition::Frames::Ref::RefItems
  def self.build(ref_items:)
    items = ::RefItems.new(ref_items)
    change(items:)
    items.to_h
  end

  def self.change(items:)
    if items.to_h.blank? || items.from.blank?
      items.from = "frame"
    end
  end
end
