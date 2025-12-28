# frozen_string_literal: true

# page transition
module PageTransition
  # session
  module Session
    # List module
    module List
      extend ActiveSupport::Concern
      include PageTransition::Query::List

      protected

      def ref_items_for_frame
        @ref_items_for_frame ||= { from: "profile" }
      end
    end
  end
end
