# frozen_string_literal: true

# Frames::PageTransition::TagMap class
class Frames::PageTransition::TagMap
  def self.build(frame:)
    tag_map = self.new(frame:)
    tag_map.build_map
  end

  def build_map
    tags = frame.plain_tags
    map = {}
    tags.each do |tag|
      map[tag] = {
        q: Oj.dump({ tag_name: tag })
      }
    end
    map
  end

  private

  attr_accessor :frame

  def initialize(frame:)
    self.frame = frame
  end
end
