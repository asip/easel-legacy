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
      @back_to_path ||= ->() {
        items = ref_items
        case items[:from]
        when "frame"
          frame_path(Frame.find(items[:id]), Ref::UserRef.query_from(ref_items: items, q_items: permitted_params[:q]))
        else
          prev_url
        end
      }.call
    end

    def self.query_from(ref_items:, q_items:)
      page = ref_items[:page]
      items = {}
      items[:page] = page if page.present?
      query = {}
      query[:q] = q_items if q_items.present?
      query[:ref] = items.to_json if items.present?
      query
    end

    def ref_items_for_frame
      { from: "user_profile", id: permitted_params[:id] }
    end
  end
end
