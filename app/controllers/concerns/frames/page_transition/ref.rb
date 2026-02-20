# frozen_string_literal: true

# Frames::PageTransition::Ref module
module Frames::PageTransition::Ref
  extend ActiveSupport::Concern

  include PageTransition::Query::Ref

  protected

  def query_map
    @query_map ||= Frames::PageTransition::Ref.query_map(ref_items: ref_items_for_user)
  end

  def back_to_path
    @back_to_path ||= Frames::PageTransition::Ref.back_to_path(
      ref:, root_path: root_path(query_map_for_search),
      prev_url:, page:, action_name:
    )
  end

  def ref_items_for_user
    @ref_items_for_user ||= Frames::PageTransition::Ref.ref_items_from(ref:)
  end

  private

  def self.query_map(ref_items:)
    query = {}
    query[:ref] = Oj.dump(ref_items) if ref_items.present?
    query
  end

  def self.back_to_path(ref:, root_path:, prev_url:, page:, action_name:)
    items = Json::Util.to_hash(ref)
    from = items[:from]
    if ![ "new", "edit" ].include?(action_name) && from.blank?
      root_path
    else
      PageTransition::PrevUrl.upsert_page_query(prev_url:, page:)
    end
  end

  def self.ref_items_from(ref:)
    items = Json::Util.to_hash(ref)
    if items.blank? || (items.present? && items[:from].blank?)
      items[:from] = "frame"
    end
    items
  end
end
