# frozen_string_literal: true

# PageTransition::Location::Cookies module
module PageTransition::Location::Cookies
  extend ActiveSupport::Concern

  included do
    helper_method :prev_url
    helper_method :prev_url_for
  end

  protected

  def prev_url_for(path:)
    cookies["prev_url#{path.gsub("/", "_")}".to_sym] || root_path
  end

  def prev_url
    prev_url_for(path: request.path)
  end

  def prev_url=(prev_url)
    cookies["prev_url#{request.path.gsub("/", "_")}".to_sym] = { value: prev_url, expires: 1.day.from_now, http_only: true }
  end
end
