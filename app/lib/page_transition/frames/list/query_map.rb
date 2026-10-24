# PageTransition::Frames::List::QueryMap class
class PageTransition::Frames::List::QueryMap
  def self.build(page:)
    query = ::QueryMap.new
    query.page = page if page.present? && page != "1"
    query.to_h
  end
end
