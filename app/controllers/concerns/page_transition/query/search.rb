# frozen_string_literal: true

# PageTransition::Query::Search module
module PageTransition::Query::Search
  extend ActiveSupport::Concern

  included do
    helper_method :search_query_map
  end
end
