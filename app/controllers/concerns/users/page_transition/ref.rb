# Users::PageTransition::Ref module
module Users::PageTransition::Ref
  extend ActiveSupport::Concern

  include PageTransition::Query::Ref

  protected

  def query_map
    @query_map ||= QueryMap.build(ref_items: ref_items_for__frame)
  end

  def ref_items_for__frame
    @ref_items_for_frame ||= RefItems.build(ref_items: Json::Util.to_hash(ref))
  end
end
