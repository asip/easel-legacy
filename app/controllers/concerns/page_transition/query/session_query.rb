# frozen_string_literal: true

# page transition
module PageTransition
  # query
  module Query
    # SessionQuery module
    module SessionQuery
      extend ActiveSupport::Concern

      def query_map
        {}
      end
    end
  end
end
