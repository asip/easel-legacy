# frozen_string_literal: true

# referer
module Ref
  # UserRef module
  module UserRef
    extend ActiveSupport::Concern
    include Query::Ref

    included do
      helper_method :back_to_path
    end

    protected

    def back_to_path
      items = ref_items
      case items[:from]
      when "frame"
        frame_path(Frame.find(items[:id]), Ref::UserRef.query_from(ref_items: items, q_items: permitted_params[:q]))
      else
        root_path(query_map)
      end
    end

    protected

    def self.query_from(ref_items:, q_items:)
      page = ref_items[:page]
      query = {}
      query[:q] = q_items if q_items.present?
      query[:page] = page if page.present?
      query
    end
  end
end
