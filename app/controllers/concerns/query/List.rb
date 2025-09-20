# frozen_string_literal: true

# query
module Query
  # List module
  module List
    extend ActiveSupport::Concern

    included do
      helper_method :query_map_for_list
    end

    protected

    def query_map_for_list(page:)
      query_ref = { ref: ref_items_for_list.to_json }
      case page
      when "user_profile"
        query_map.merge(query_ref)
      when "profile"
        query_map.merge(query_ref)
      else
        query_map
      end
    end

    def ref_items_for_list
      {}
    end
  end
end
