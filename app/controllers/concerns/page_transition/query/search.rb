# frozen_string_literal: true

# page transition
module PageTransition
  # query
  module Query
    # Search module
    module Search
      extend ActiveSupport::Concern

      included do
        helper_method :query_map
      end

      protected

      def query_list
        %i[ref page]
      end

      def query_map
        @query_map ||= permitted_params.to_h.filter do |key, value|
          query_list.include?(key.to_sym) if value.present?
        end
      end

      def page
        permitted_params[:page]
      end
    end
  end
end
