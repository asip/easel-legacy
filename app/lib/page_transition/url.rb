# frozen_string_literal: true

# PageTransition::Url class
class PageTransition::Url
  def self.upsert_page_query(url:, page:)
    if page.present?
      change_with_page(page:, url:)
    else
      change_without_page(url:)
    end
  end

  def self.change_with_page(page:, url:)
    if url.include?("page=")
      url.sub(/page=[0-9]+/, "page=#{page}")
    else
      if url.match(/\?[a-z]+=/)
        "#{url}&page=#{page}"
      else
        "#{url}?page=#{page}"
      end
    end
  end

  def self.change_without_page(url:)
    if url.include?("page=")
      url.sub(/(&|\?)page=[0-9]+/, "")
    else
      url
    end
  end
end
