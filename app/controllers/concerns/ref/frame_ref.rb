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
