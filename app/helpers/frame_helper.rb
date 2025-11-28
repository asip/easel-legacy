# frozen_string_literal: true

# Frame Helper
module FrameHelper
  def tag_map(frame:)
    tags = frame.plain_tags
    map = {}
    tags.each do |tag|
      criteria_ = { tag_name: tag }.to_json
      map[tag] = {
        q: criteria_,
        path: root_path({ q: criteria_ })
      }
    end
    map
  end
end
