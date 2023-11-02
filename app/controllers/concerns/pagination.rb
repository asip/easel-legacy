# frozen_string_literal: true

# Pagination module
module Pagination
  extend ActiveSupport::Concern

  def resources_with_pagination(resources)
    {
      meta: {
        pagination: {
          count: resources.total_count,
          pages: resources.total_pages,
          page: resources.current_page,
          per: resources.limit_value
        }
      }
    }
  end
end
