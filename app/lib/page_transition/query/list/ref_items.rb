# PageTransition::Query::List::RefItems class
class PageTransition::Query::List::RefItems
  def self.build(from:)
    items = self.new(from:)
    items.build
  end

  def build
    items = {}
    items[:from] = from if from.present?
    items
  end

  private

  attr_accessor :from

  def initialize(from:)
    self.from= from
  end
end
