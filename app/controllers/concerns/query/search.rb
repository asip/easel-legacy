# frozen_string_literal: true

# Query module
module Query
  # Query module
  module Search
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
