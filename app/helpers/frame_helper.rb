# frozen_string_literal: true

# Frame Helper
module FrameHelper
  def tag_map(frame:)
    tags = frame.plain_tags
    map = {}
    tags.each do |tag|
      criteria = { tag_name: tag }.to_json
      map[tag] = {
        criteria:,
        path: root_path({ q: criteria })
      }
    end
    map
  end
end
