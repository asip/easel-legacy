# frozen_string_literal: true

# PageTransition::PrevUrl class
class PageTransition::PrevUrl
  def self.upsert_page_query(url:, page:)
    page_query = url.include?("page=")
    if page.present?
      if page_query
        url.sub(/page=[0-9]+/, "page=#{page}")
      else
        if url.match(/\?[a-z]+=/)
          "#{url}&page=#{page}"
        else
          "#{url}?page=#{page}"
        end
      end
    else
      if page_query
        url.sub(/(&|\?)page=[0-9]+/, "")
      else
        url
      end
    end
  end
end
