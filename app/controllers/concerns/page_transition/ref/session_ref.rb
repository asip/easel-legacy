# frozen_string_literal: true

# page transition
module PageTransition
  # referer
  module Ref
    # SessionRef module
    module SessionRef
      extend ActiveSupport::Concern
      include PageTransition::Query::Ref

      protected

      def ref_items_for_frame
        @ref_items_for_frame ||= { from: "profile" }
      end
    end
  end
end
