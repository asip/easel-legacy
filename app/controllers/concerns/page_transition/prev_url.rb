# frozen_string_literal: true

# page transition
module PageTransition
  # PrevUrl module
  module PrevUrl
    extend ActiveSupport::Concern

    def upsert_page_query
      include_page_query = prev_url.include?("page=")
      if page.present?
        if include_page_query
          prev_url.sub(/page=[0-9]+/, "page=#{page}")
        else
          if prev_url.match(/\?[a-z]+=/)
            "#{prev_url}&page=#{page}"
          else
            "#{prev_url}?page=#{page}"
          end
        end
      else
        if include_page_query
          prev_url.sub(/(&|\?)page=[0-9]+/, "")
        else
          prev_url
        end
      end
    end
  end
end
