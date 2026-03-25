# Users::PageTransition::Ref module
module Users::PageTransition::Ref
  extend ActiveSupport::Concern

  include PageTransition::Query::Ref

  protected

  def query_map
    @query_map ||= QueryMap.build(ref_items: ref_items_for_next)
  end

  def ref_items_for_next
    @ref_items_for_next ||= RefItems.build(ref_items: JsonUtil.to_hash(ref))
  end
end
