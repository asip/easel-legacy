# frozen_string_literal: true

# PageTransition::Query::Ref module
module PageTransition::Query::Ref
  extend ActiveSupport::Concern

  included do
    helper_method :query_map
    helper_method :back_to_path
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

  def back_to_path
    @back_to_path ||= prev_url
  end
end
