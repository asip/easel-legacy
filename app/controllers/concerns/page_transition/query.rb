# frozen_string_literal: true

# PageTransition::Query module
module PageTransition::Query
  extend ActiveSupport::Concern

  included do
    helper_method :query_map
  end

  protected

  def query_list
    %i[ref page]
  end

  def query_map
    @query_map ||= self.cookie_query_map.to_h
  end
end
