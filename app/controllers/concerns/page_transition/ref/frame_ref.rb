# frozen_string_literal: true

# page transition
module PageTransition
  # referer
  module Ref
    # FrameRef module
    module FrameRef
      extend ActiveSupport::Concern
      include PageTransition::Query::Ref

      included do
        helper_method :back_to_path
      end

      protected

      def back_to_path
        @back_to_path ||= ->() {
          # puts ref_items
          items = Json::Util.to_hash(ref_str)
          from = items[:from]
          if from.blank?
            root_path(query_map)
          else
            prev_url
          end
        }.call
      end

      def ref_items_for_user
        @ref_items_for_user ||= Ref::FrameRef.ref_items_from(ref: ref_str, frame:)
      end

      def self.ref_items_from(ref:, frame:)
        items = Json::Util.to_hash(ref)
        if items.blank? || (items.present? && items[:from].blank?)
          items[:from] = "frame"
        end
        items
      end
    end
  end
end
