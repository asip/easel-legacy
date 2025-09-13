# frozen_string_literal: true

# referrer
module Ref
  # User module
  module User
    extend ActiveSupport::Concern

    included do
      # helper_method :ref_list
      helper_method :ref_map
      helper_method :back_to_path
    end

    protected

    def ref_list
      %i[ref]
    end

    def ref_map
      permitted_params.to_h.filter do |key, value|
        ref_list.include?(key.to_sym) if value.present?
      end
    end

    def ref_items
      ref = permitted_params[:ref]
      ref.present? ? JSON.parse(ref) : {}
    end

    def back_to_path
      items = ref_items
      case items["from"]
      when "frame"
        frame_path(Frame.find(items["id"]), Ref::User.query_items_from(ref_items: items))
      else
        ""
      end
    end

    protected

    def self.query_items_from(ref_items:)
      q_items = ref_items["q"]
      page = ref_items["page"]
      query = {}
      query[:q] = q_items if q_items.present?
      query[:page] = page if page.present?
      query
    end
  end
end
