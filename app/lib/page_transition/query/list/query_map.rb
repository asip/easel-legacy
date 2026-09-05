# PageTransition::Query::List::QueryMap class
class PageTransition::Query::List::QueryMap
  def self.build(from:, page:)
    query_map = self.new(from:, page:)
    query_map.build
  end

  def build
    ref_items = PageTransition::Query::List::RefItems.build(from:)
    query = {}
    if page.present? && page != 1
      case from
      when "user_profile", "profile"
        query[:page] = page
      else
        ref_items[:page] = page
      end
    end
    query[:ref] = JsonUtil.stringify(ref_items) if ref_items.present?
    query
  end

  private

  attr_accessor :from
  attr_accessor :page

  def initialize(from:, page:)
    self.from= from
    self.page = page
  end
end
