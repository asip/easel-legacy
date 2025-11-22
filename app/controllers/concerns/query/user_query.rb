# frozen_string_literal: true

# query
module Query
  # UserQuery module
  module UserQuery
    extend ActiveSupport::Concern

    def query_map
      items_q = permitted_params[:q]
      items_q.present? ? { q: items_q } : {}
    end
  end
end
