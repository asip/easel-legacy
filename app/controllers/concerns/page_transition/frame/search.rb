# frozen_string_literal: true

# page transition
module PageTransition
  # frame
  module Frame
    # Search module
    module Search
      extend ActiveSupport::Concern
      include PageTransition::Query::Search

      protected

      def query_map_for_search
        @query_map_for_search ||= ->() {
          query = {}
          items_from = ref_items[:from]
          items_page = ref_items[:page]
          query[:page] = items_page if items_from.blank? && items_page.present?
          query[:ref] = ref_items.to_json if items_from.present?
          query
        }.call
      end
    end
  end
end
