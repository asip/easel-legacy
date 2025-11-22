# frozen_string_literal: true

# referer
module Ref
  # FrameRef module
  module FrameRef
    extend ActiveSupport::Concern
    include Query::Ref

    included do
      helper_method :back_to_path
    end

    protected

    def back_to_path
      @back_to_path ||= ->() {
        # puts ref_items
        items = Json::Util.to_hash(ref_str)
        from = items[:from]
        if from.blank?
          root_path(query_map)
        else
          case from
          when "user_profile"
            user_path(
              User.with_discarded.find(items[:id]),
              Ref::FrameRef.query_from(
                q_items: q_str, ref_items: items, page: page_str
              )
            )
          when "profile"
            profile_path(
              Ref::FrameRef.query_from(
                ref_items: items, page: page_str
              )
            )
          else
            prev_url
          end
        end
      }.call
    end

    def self.query_from(q_items: nil, ref_items:, page:)
      query = {}
      query[:q] = q_items if q_items.present?
      ref_items.delete(:from)
      ref_items.delete(:id)
      query[:ref] = ref_items.to_json if ref_items.present?
      query[:page] = page if page.present?
      query
    end

    def ref_items_next
      @ref_items_next ||= Ref::FrameRef.ref_items_from(ref: ref_str, frame:)
    end

    def self.ref_items_from(ref:, frame:)
      items = Json::Util.to_hash(ref)
      if items.blank? || (items.present? && items[:from].blank?)
        items[:from] = "frame"
        items[:id] = frame.id
      end
      items
    end
  end
end
