# frozen_string_literal: true

# PageTransition::Query::Search module
module PageTransition::Query::Search
  extend ActiveSupport::Concern

  included do
    helper_method :query_map_for_search
  end

  protected

  def query_map_for_search
    @query_map_for_search ||= permitted_params.to_h.filter do |key, value|
      query_list.include?(key.to_sym) if value.present?
    end
  end
end
