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

    def back_to_path
      items = JSON.parse(ref_map["ref"])
      case items["from"]
      when "frame_detail"
        frame_path(Frame.find(items["id"]), { q: items["q"] })
      else
        ""
      end
    end
  end
end
