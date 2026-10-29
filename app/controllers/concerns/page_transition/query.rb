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
    @query_map ||= cookies.to_hash.filter do |key, value|
      query_list.include?(key.to_sym) if value.present?
    end.with_indifferent_access
  end
end
