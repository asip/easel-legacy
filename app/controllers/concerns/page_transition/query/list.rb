# frozen_string_literal: true

# PageTransition::Query::List module
module PageTransition::Query::List
  extend ActiveSupport::Concern

  included do
    helper_method :query_map_for_frame
  end

  protected

  def query_map_for_frame(from:, page:)
    QueryMap.build(from:, page:, ref_items: ref_items_for_frame)
  end

  def ref_items_for_frame
    @ref_items_for_frame ||= {}
  end
end
