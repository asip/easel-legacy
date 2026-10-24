# PageTransition::Frames::Search::QueryMap class
class PageTransition::Frames::Search::QueryMap
  def self.build(ref_items:)
    query = ::QueryMap.new
    from = ref_items[:from]
    page = ref_items[:page]
    query.page = page if from.blank? && page.present?
    query.ref = JsonUtil.stringify(ref_items) if from.present?
    query.to_h
  end
end
