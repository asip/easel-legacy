# frozen_string_literal: true

# PageTransition::Cookies::Location class
class PageTransition::Cookies::Location
  def initialize(request, cookies)
    @request = request
    @cookies = cookies
  end

  def prev_url_for(path:)
    @cookies["prev_url#{path.gsub("/", "_")}".to_sym] || root_path
  end

  def prev_url
    prev_url_for(path: @request.path)
  end

  def prev_url=(prev_url)
    @cookies["prev_url#{@request.path.gsub("/", "_")}".to_sym] = { value: prev_url, expires: 1.day.from_now, http_only: true }
  end

  def self.build(request, cookies)
    self.new(request, cookies)
  end
end
