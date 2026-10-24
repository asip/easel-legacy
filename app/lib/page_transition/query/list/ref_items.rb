# PageTransition::Query::List::RefItems class
class PageTransition::Query::List::RefItems
  def self.build(from:)
    items = ::RefItems.new
    items.from = from if from.present?
    items
  end
end
