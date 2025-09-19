# frozen_string_literal: true

# referrer
module Ref
  # FrameRef module
  module FrameRef
    extend ActiveSupport::Concern

    included do
      # helper_method :ref_list
      helper_method :ref_map
      helper_method :back_to_path
    end

    protected

    def ref_list
      %i[ref q]
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
      puts items
      case items["from"]
      when "user_profile"
        user_path(User.with_discarded.find(items["id"]), Ref::FrameRef.query_from(q_items: permitted_params[:q]))
      when "profile"
        profile_path
      else
        root_path(query_map)
      end
    end

    protected

    def self.query_from(q_items:)
      query = {}
      query[:q] = q_items if q_items.present?
      query
    end
  end
end
