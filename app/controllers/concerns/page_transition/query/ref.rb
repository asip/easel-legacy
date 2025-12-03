# frozen_string_literal: true

# page transition
module PageTransition
  # query
  module Query
    # Ref module
    module Ref
      extend ActiveSupport::Concern

      included do
        helper_method :query_map_without_q
      end

      protected

      def query_list_without_q
        %i[ref page]
      end

      def query_map_without_q
        @query_map_without_q ||= permitted_params.to_h.filter do |key, value|
          query_list_without_q.include?(key.to_sym) if value.present?
        end
      end

      def ref_items
        @ref_items ||= Json::Util.to_hash(ref)
      end

      def ref
        items = permitted_params[:ref]
        items.present? ? items : nil
      end

      def back_to_path
        @back_to_path ||= prev_url
      end
    end
  end
end
