# PageTransition::Frames::List::QueryMap class
class PageTransition::Frames::List::QueryMap
  def self.build(page:)
    query_map = self.new(page:)
    query_map.build_query
  end

  def build_query
    query = {}
    query[:page] = page if page.present? && page != "1"
    query
  end

  private

  attr_accessor :page

  def initialize(page:)
    self.page = page
  end
end
