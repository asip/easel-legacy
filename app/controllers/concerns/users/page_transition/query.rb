# Users::PageTransition::Query module
module Users::PageTransition::Query
  extend ActiveSupport::Concern

  include PageTransition::Query

  protected

  def query_map
    @query_map ||= ::PageTransition::Users::Query::QueryMap.build(
      ref_items: ::PageTransition::Users::Query::RefItems.build(ref_items: JsonUtil.parse(cookie_query_map.ref))
    )
  end
end
