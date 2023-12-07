# frozen_string_literal: true

# mutations
module Mutations
  # users
  module Users
    # SaveUser
    class SaveUser
      include Mutation

      attr_reader :user

      def initialize(user:)
        @user = user
      end

      def execute
        @success = @user.save(context: :with_validation)

        errors.merge!(@user.errors) unless @success
      end

      def success?
        @success
      end
    end
  end
end
