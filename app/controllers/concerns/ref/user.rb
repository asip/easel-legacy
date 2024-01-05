# frozen_string_literal: true

# referrer
module Ref
  # User module
  module User
    extend ActiveSupport::Concern

    included do
      helper_method :ref_list
      helper_method :ref_params
      helper_method :back_to_path
    end

    def ref_list
      %i[ref ref_id]
    end

    def ref_params
      permitted_params.to_h.filter do |key, _value|
        ref_list.include?(key.to_sym)
      end
    end

    def back_to_path
      case ref_params[:ref]
      when "frame_detail"
        frame_path(Frame.find(ref_params[:ref_id]))
      else
        ""
      end
    end
  end
end
