# PageTransition::Query::List::QueryMap class
class PageTransition::Query::List::QueryMap
  def self.build(from:, page:)
    ref_items = PageTransition::Query::List::RefItems.build(from:)
    query = ::QueryMap.new
    if page.present? && page != 1
      case from
      when "user_profile", "profile"
        query.page = page
      else
        ref_items[:page] = page
      end
    end
    query.ref = JsonUtil.stringify(ref_items) if ref_items.present?
    query.to_h
  end
end
