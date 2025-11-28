# frozen_string_literal: true

# Cookie Module
module Cookie
  extend ActiveSupport::Concern

  included do
    helper_method :prev_url
    helper_method :prev_url_for
  end

  protected

  def criteria
    criteria = cookies[:q]
    criteria.present? ? criteria : "{}"
  end

  def criteria=(criteria)
    cookies[:q] = criteria
  end

  def q_items
    @q_items ||= Json::Util.to_hash(criteria)
    @q_items
  end

  def prev_url_for(path:)
    cookies["prev_url[#{path}]".to_sym]
  end

  def prev_url
    prev_url_for(path: request.path)
  end

  def prev_url=(prev_url)
    cookies["prev_url[#{request.path}]".to_sym] = prev_url
  end
end
