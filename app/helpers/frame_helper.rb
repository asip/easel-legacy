# frozen_string_literal: true

# Frame Helper
module FrameHelper
  def tag_map(frame:)
    tags = frame.plain_tags
    map = {}
    tags.each do |tag|
      map[tag] = {
        q: { tag_name: tag }.to_json
      }
    end
    map
  end
end
