# frozen_string_literal: true

# PageTransition::Cookies::QueryMap class
class PageTransition::Cookies::QueryMap
  def initialize(cookies)
    @cookies = cookies
  end

  def ref
    items = @cookies[:ref]
    items.present? ? items : nil
  end

  def ref_items
    @ref_items ||= JsonUtil.to_hash(ref)
  end

  def page
    @cookies[:page]
  end

  def page=(page)
    @cookies[:page] = page
  end

  def self.from(cookies)
    self.new(cookies)
  end
end
