# frozen_string_literal: true

# Frame Helper
module FrameHelper
  def self.tag_map(frame:)
    tags = frame.plain_tags
    map = {}
    tags.each do |tag|
      map[tag] = {
        q: { tag_name: tag }.to_json
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
