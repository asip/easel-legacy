# PageTransition::Query::List::QueryMap class
class PageTransition::Query::List::QueryMap
  def self.build(from:, page:, ref_items:)
    query_map = self.new(from:, page:, ref_items:)
    query_map.build
  end

  def build
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
  attr_accessor :ref_items

  def initialize(from:, page:, ref_items:)
    self.from= from
    self.page = page
    self.ref_items = ref_items
  end
end
