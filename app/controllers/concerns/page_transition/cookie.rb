# frozen_string_literal: true

# PageTransition::Cookie module
module PageTransition::Cookie
  extend ActiveSupport::Concern

  included do
    helper_method :prev_url
    helper_method :prev_url_for
  end

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

  def prev_url_for(path:)
    cookies["prev_url#{path.gsub("/", "_")}".to_sym]
  end

  def prev_url
    prev_url_for(path: request.path)
  end

  def prev_url=(prev_url)
    cookies["prev_url#{request.path.gsub("/", "_")}".to_sym] = { value: prev_url, expires: 1.day.from_now, http_only: true }
  end
end
