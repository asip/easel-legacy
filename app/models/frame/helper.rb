# frozen_string_literal: true

# Frame::Helper module
module Frame::Helper
  extend ActiveSupport::Concern

  class_methods do
    def tag_map(frame:)
      ::PageTransition::Frames::TagMap.build(frame:)
    end

    def paging_query_map(page:)
      ::PageTransition::Frames::List::QueryMap.build(page:)
    end

    def detail_query_map(from:, page:)
      ::PageTransition::Query::List::QueryMap.build(from:, page:)
    end

    def search_query_map(ref_items:)
      ::PageTransition::Frames::Search::QueryMap.build(ref_items:)
    end
  end
end
