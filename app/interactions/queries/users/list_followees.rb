# frozen_string_literal: true

# queries
module Queries
  # frames
  module Users
    # ListFollowees
    class ListFollowees
      include Query

      def initialize(user_id:)
        @user_id = user_id
      end

      def execute
        User.find(@user_id).followees
      end
    end
  end
end
