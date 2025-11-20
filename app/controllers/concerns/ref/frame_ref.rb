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
      items = ref_items
      # puts items
      case items[:from]
      when "user_profile"
        user_path(
          User.with_discarded.find(items[:id]),
          Ref::FrameRef.query_from(
            q_items: q_str, ref_items:, page: page_str
          )
        )
      when "profile"
        profile_path(
          Ref::FrameRef.query_from(
            ref_items:, page: page_str
          )
        )
      else
        root_path(query_map)
      end
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
  end
end
