# frozen_string_literal: true

# queries
module Queries
  # frames
  module Users
    # ListFollowers
    class ListFollowers
      include Query

      def initialize(user_id:)
        @user_id = user_id
      end

      def execute
        User.find(@user_id).followers
      end
    end
  end
end
