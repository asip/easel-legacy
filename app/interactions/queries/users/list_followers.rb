# frozen_string_literal: true

# queries
module Queries
  # frames
  module Users
    # ListFollowers class
    class ListFollowers
      include Query

      def initialize(user_id:)
        @user_id = user_id
      end

      def execute
        User.with_discarded.find(@user_id).followers
      end
    end
  end
end
