# frozen_string_literal: true

# PageTransition::Frames::TagMap class
class PageTransition::Frames::TagMap
  def self.build(frame:)
    tag_map = self.new(frame:)
    tag_map.build
  end

  def build
    tags = frame.plain_tags
    map = {}
    tags.each do |tag|
      map[tag] = JsonUtil.stringify({
        q: JsonUtil.stringify({ tag_name: tag })
      })
    end
    map
  end

  private

  attr_accessor :frame

  def initialize(frame:)
    self.frame = frame
  end
end
