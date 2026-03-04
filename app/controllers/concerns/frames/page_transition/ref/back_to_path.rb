# Frames::PageTransition::Ref::BackToPath class
class Frames::PageTransition::Ref::BackToPath
  def self.build(ref:, root_path:, prev_url:, page:, action_name:)
    back_to_path = self.new(ref:, root_path:, prev_url:, page:, action_name:)
    back_to_path.build_path
  end

  def build_path
    items = Json::Util.to_hash(ref)
    from = items[:from]
    if ![ "new", "edit" ].include?(action_name) && from.blank?
      root_path
    else
      PageTransition::PrevUrl.upsert_page_query(prev_url:, page:)
    end
  end

  private

  attr_accessor :ref
  attr_accessor :root_path
  attr_accessor :prev_url
  attr_accessor :page
  attr_accessor :action_name

  def initialize(ref:, root_path:, prev_url:, page:, action_name:)
    self.ref = ref
    self.root_path = root_path
    self.prev_url = prev_url
    self.page = page
    self.action_name = action_name
  end
end
