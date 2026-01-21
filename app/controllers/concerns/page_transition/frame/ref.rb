# frozen_string_literal: true

# page transition
module PageTransition
  # frame
  module Frame
    # Ref module
    module Ref
      extend ActiveSupport::Concern
      include PageTransition::Query::Ref
      include PageTransition::PrevUrl

      protected

      def query_map
        @query_map ||= ->() {
          query = {}
          query[:ref] = ref_items_for_user.to_json if ref_items_for_user.present?
          query
        }.call
      end

      def back_to_path
        @back_to_path ||= ->() {
          # puts ref_items
          items = Json::Util.to_hash(ref)
          from = items[:from]
          if action_name != "new" && action_name != "edit" && from.blank?
            root_path(query_map_for_search)
          else
            upsert_page_query
          end
        }.call
      end

      def ref_items_for_user
        @ref_items_for_user ||= Frame::Ref.ref_items_from(ref:)
      end

      def self.ref_items_from(ref:)
        items = Json::Util.to_hash(ref)
        if items.blank? || (items.present? && items[:from].blank?)
          items[:from] = "frame"
        end
        items
      end
    end
  end
end
