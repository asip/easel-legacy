# frozen_string_literal: true

# referer
module Ref
  # SessionRef module
  module SessionRef
    extend ActiveSupport::Concern
    include Query::Ref

    included do
      helper_method :back_to_path
    end

    protected

    def back_to_path
      prev_url
    end

    def ref_items_for_frame
      { from: "profile" }
    end
  end
end
