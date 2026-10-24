# PageTransition::Frames::Ref::BackToPath class
class PageTransition::Frames::Ref::BackToPath
  def self.build(query_map:, root_path:, prev_url:, action_name:)
    ref_items = ::RefItems.new(JsonUtil.parse(query_map.ref))
    if ![ "new", "edit" ].include?(action_name) && ref_items.from.blank?
      root_path
    else
      PageTransition::PrevUrl.upsert_page_query(url: prev_url, page: query_map.page)
    end
  end
end
