# Users::PageTransition::Ref module
module Users::PageTransition::Ref
  extend ActiveSupport::Concern

  include PageTransition::Query::Ref

  protected

  def query_map
    @query_map ||= ::PageTransition::Users::Ref::QueryMap.build(ref_items: ref_items_for_next)
  end

  def ref_items_for_next
    @ref_items_for_next ||= ::PageTransition::Users::Ref::RefItems.build(ref_items: JsonUtil.parse(cookie_query_map.ref))
  end
end
