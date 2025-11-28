# frozen_string_literal: true

# page transition
module PageTransition
  # query
  module Query
    # FrameQuery module
    module FrameQuery
      extend ActiveSupport::Concern

      protected

      def query_map
        @query_map ||= ->() {
          query = {}
          items_from = ref_items[:from]
          items_page = ref_items[:page]
          query[:page] = items_page if items_from.blank? && items_page.present?
          query[:ref] = ref_items.to_json if items_from.present?
          query
        }.call
      end

      def query_map_with_ref
        @query_map_with_ref ||= ->() {
          query = {}
          query[:ref] = ref_items_next.to_json if ref_items_next.present?
          query
        }.call
      end
    end
  end
end
