# frozen_string_literal: true

# page transition
module PageTransition
  # query
  module Query
    # List module
    module List
      extend ActiveSupport::Concern

      included do
        helper_method :query_map_for_frame
      end

      protected

      def query_map_for_frame(from:, page:)
        query = criteria.present? ? { q: criteria } : {}
        # query = {}
        query.merge(query_map_with_ref_for_frame(from:, page:))
      end

      def query_map_with_ref_for_frame(from:, page:)
        query = {}
        if page.present? && page != 1
          case from
          when "user_profile", "profile"
            query[:page] = page
          else
            ref_items_for_frame[:page] = page
          end
        end
        query[:ref] = ref_items_for_frame.to_json if ref_items_for_frame.present?
        query
      end

      def ref_items_for_frame
        {}
      end
    end
  end
end
