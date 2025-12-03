# frozen_string_literal: true

# page transition
module PageTransition
  # referer
  module Ref
    # UserRef module
    module UserRef
      extend ActiveSupport::Concern
      include PageTransition::Query::Ref

      protected

      def ref_items_for_frame
        @ref_items_for_frame ||= { from: "user_profile" }
      end
    end
  end
end
