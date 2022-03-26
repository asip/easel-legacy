# frozen_string_literal: true

# Search Module
module Search
  # Query module
  module Query
    extend ActiveSupport::Concern

    included do
      helper_method :query_list
      helper_method :query_params
    end

    def query_list
      %i[page q]
    end

    def query_params
      permitted_params.to_h.filter do |key, _value|
        query_list.include?(key.to_sym)
      end
    end
  end
end
