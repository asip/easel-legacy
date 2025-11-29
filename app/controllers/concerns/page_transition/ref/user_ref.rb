# frozen_string_literal: true

# page transition
module PageTransition
  # referer
  module Ref
    # UserRef module
    module UserRef
      extend ActiveSupport::Concern
      include PageTransition::Query::Ref

      included do
        helper_method :back_to_path
      end

      protected

      def back_to_path
        @back_to_path ||= prev_url
      end

      def ref_items_for_frame
        @ref_items_for_frame ||= { from: "user_profile" }
      end
    end
  end
end
