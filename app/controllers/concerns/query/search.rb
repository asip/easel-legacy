# frozen_string_literal: true

# query
module Query
  # Search module
  module Search
    extend ActiveSupport::Concern

    included do
      # helper_method :query_list
      helper_method :query_map
      helper_method :paging_query_map
    end

    protected

    def query_list
      %i[page q]
    end

    def query_map
      permitted_params.to_h.filter do |key, value|
        query_list.include?(key.to_sym) if value.present?
      end
    end

    def paging_query_map(page:)
      items = permitted_params[:q]
      query = {}
      query[:q] = items if items.present?
      query[:page] = page
      query
    end

    def query_items
      items = permitted_params[:q]
      items.present? ? JSON.parse(items) : {}
    end
  end
end
