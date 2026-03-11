# Users::PageTransition::Ref module
module Users::PageTransition::Ref
  extend ActiveSupport::Concern

  include PageTransition::Query::Ref

  protected

  def query_map
    @query_map ||= QueryMap.build(ref_items: ref_items_for__frame)
  end

  def back_to_path
    @back_to_path ||= prev_url
    # BackToPath.build(
    #  ref_items: Json::Util.to_hash(ref),
    #  root_path: root_path(query_map_for_search),
    #  prev_url:, page:, action_name:
    # )
  end

  def ref_items_for__frame
    @ref_items_for_frame ||= RefItems.build(ref_items: Json::Util.to_hash(ref))
  end
end
