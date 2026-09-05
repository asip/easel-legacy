# frozen_string_literal: true

# PageTransition::Query::List module
module PageTransition::Query::List
  extend ActiveSupport::Concern

  included do
    helper_method :frame_query_map
  end

  protected

  def frame_query_map(from:, page:)
    QueryMap.build(from:, page:, ref_items:)
  end

  def ref_items
    @ref_items ||= {}
  end
end
