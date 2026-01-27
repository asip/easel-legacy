# frozen_string_literal: true

# PageTransition::Query::List module
module PageTransition::Query::List
  extend ActiveSupport::Concern

  included do
    helper_method :query_map_for_frame
  end

  protected

  def query_map_for_frame(from:, page:)
    PageTransition::Query::List.query_map_for_frame(from:, page:, ref_items: ref_items_for_frame)
  end

  def ref_items_for_frame
    @ref_items_for_frame ||= {}
  end

  private

  def self.query_map_for_frame(from:, page:, ref_items:)
    query = {}
    if page.present? && page != 1
      case from
      when "user_profile", "profile"
        query[:page] = page
      else
        ref_items[:page] = page
      end
    end
    query[:ref] = ref_items.to_json if ref_items.present?
    query
  end
end
