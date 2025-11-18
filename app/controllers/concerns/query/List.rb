# frozen_string_literal: true

# query
module Query
  # List module
  module List
    extend ActiveSupport::Concern

    included do
      helper_method :query_map_for_frame
    end

    protected

    def query_map_for_frame(from:, page:)
      q_ = q_str
      query = q_.present? ? { q: q_ } : {}
      query.merge(ref_items_for_frame(from:, page:))
    end

    def self.ref_items_from(page:)
      page.present? && page != 1 ? page : nil
    end

    def ref_items_for_frame(from:, page:)
      query = {}
      items_ref = default_ref_items
      page_ = Query::List.ref_items_from(page:)
      if page_.present?
        case from
        when "user_profile", "profile"
          query[:page] = page_
        else
          items_ref[:page] = page_
        end
      end
      query[:ref] = items_ref.to_json if items_ref.present?
      query
    end

    def default_ref_items
      {}
    end
  end
end
