# frozen_string_literal: true

# query
module Query
  # Search module
  module Search
    extend ActiveSupport::Concern

    included do
      helper_method :query_list
      helper_method :query_map
    end

    protected

    def query_list
      %i[page q]
    end

    def query_map
      permitted_params.to_h.filter do |key, _value|
        query_list.include?(key.to_sym)
      end
    end
  end
end
