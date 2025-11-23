# frozen_string_literal: true

# page transition
module PageTransition
  # query
  module Query
    # Ref module
    module Ref
      extend ActiveSupport::Concern

      included do
        # helper_method :query_list_with_ref
        helper_method :query_map_with_ref
      end

      protected

      def query_list_with_ref
        %i[q ref page]
      end

      def query_map_with_ref
        @query_map_with_ref ||= permitted_params.to_h.filter do |key, value|
          query_list_with_ref.include?(key.to_sym) if value.present?
        end
      end

      def ref_items
        @ref_items ||= Json::Util.to_hash(permitted_params[:ref])
      end
    end
  end
end
