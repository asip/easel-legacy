# frozen_string_literal: true

# Frames Helper
module FramesHelper
  def self.tag_map(frame:)
    tags = frame.plain_tags
    map = {}
    tags.each do |tag|
      map[tag] = {
        q: Oj.dump({ tag_name: tag })
      }
    end
    map
  end

  def self.paging_query_map(page:)
    query = {}
    query[:page] = page if page.present? && page != "1"
    query
  end
end
