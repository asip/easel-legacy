# PageTransition::Query::List::QueryMap class
class PageTransition::Query::List::QueryMap
  def self.build(from:, page:)
    items = PageTransition::Query::List::RefItems.build(from:)
    query = ::QueryMap.new
    change(from:, page:, query:, items:)
    ref_items = items.to_h
    query.ref = JsonUtil.stringify(ref_items) if ref_items.present?
    query.to_h
  end

  def self.change(from:, page:, query:, items:)
    if page.present? && page != 1
      if [ "user_profile", "profile" ].include?(from)
        query.page = page
      else
        items.page = page
      end
    end
  end
end
