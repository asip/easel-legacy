# frozen_string_literal: true

# PageTransition::Query::Cookies module
module PageTransition::Query::Cookies
  extend ActiveSupport::Concern

  protected

  def ref
    items = cookies[:ref]
    items.present? ? items : nil
  end

  def ref_items
    @ref_items ||= JsonUtil.to_hash(ref)
  end

  def page
    cookies[:page]
  end

  def page=(page)
    cookies[:page] = page
  end
end
