# PageTransition::Frames::Ref::BackToPath class
class PageTransition::Frames::Ref::BackToPath
  def self.build(query_map:, root_path:, prev_url:, action_name:)
    back_to_path = self.new(query_map:, root_path:, prev_url:, action_name:)
    back_to_path.build_path
  end

  def build_path
    ref_items = JsonUtil.parse(query_map.ref)
    from = ref_items[:from]
    if ![ "new", "edit" ].include?(action_name) && from.blank?
      root_path
    else
      PageTransition::PrevUrl.upsert_page_query(prev_url:, page: query_map.page)
    end
  end

  private

  attr_accessor :query_map
  attr_accessor :root_path
  attr_accessor :prev_url
  attr_accessor :action_name

  def initialize(query_map:, root_path:, prev_url:, action_name:)
    self.query_map = query_map
    self.root_path = root_path
    self.prev_url = prev_url
    self.action_name = action_name
  end
end
