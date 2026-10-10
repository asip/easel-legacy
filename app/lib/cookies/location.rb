# frozen_string_literal: true

# Cookies::Location class
class Cookies::Location
  def initialize(request, cookies, fallback)
    @request = request
    @cookies = cookies
    @fallback = fallback
  end

  def prev_url_for(path:)
    @cookies["prev_url#{path.gsub("/", "_")}".to_sym] || @fallback
  end

  def prev_url
    prev_url_for(path: @request.path)
  end

  def prev_url=(prev_url)
    @cookies["prev_url#{@request.path.gsub("/", "_")}".to_sym] = { value: prev_url, expires: 1.day.from_now, http_only: true }
  end

  def self.from(request, cookies, fallback)
    self.new(request, cookies, fallback)
  end
end
