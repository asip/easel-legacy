# frozen_string_literal: true

# api
module Api
  # Pagination module
  module Pagination
    extend ActiveSupport::Concern

    def resources_with_pagination(pagy)
      {
        meta: {
          pagination: {
            count: pagy.total_count,
            pages: pagy.total_pages,
            page: pagy.current_page,
            per: pagy.limit_value
          }
        }
      }
    end
  end
end
