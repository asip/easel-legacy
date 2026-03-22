# frozen_string_literal: true

# Frames Helper
module FramesHelper
  def self.tag_map(frame:)
    Frames::PageTransition::TagMap.build(frame:)
  end

  def self.paging_query_map(page:)
    Frames::PageTransition::List::QueryMap.build(page:)
  end
end
