# frozen_string_literal: true

# Frame::Helper module
module Frame::Helper
  extend ActiveSupport::Concern

  class_methods do
    def tag_map(frame:)
      Frames::PageTransition::TagMap.build(frame:)
    end

    def paging_query_map(page:)
      Frames::PageTransition::List::QueryMap.build(page:)
    end
  end
end
