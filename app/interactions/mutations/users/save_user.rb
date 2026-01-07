# frozen_string_literal: true

# mutations
module Mutations
  # users
  module Users
    # SaveUser class
    class SaveUser
      include Mutation

      attr_reader :user

      def initialize(user:)
        self.user = user
      end

      def execute
        self.success = user.save(context: :with_validation)

        errors.merge!(user.errors) unless success
      end

      def success?
        success
      end

      private

      attr_accessor :success

      def user=(user)
        @user = user
      end
    end
  end
end
