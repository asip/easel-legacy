# frozen_string_literal: true

# mutations
module Mutations
  # users
  module Users
    # SaveUserWithToken class
    class SaveUserWithToken
      include Mutation

      attr_reader :user

      def initialize(user:)
        @user = user
      end

      def execute
        self.success = user.save(context: :with_validation)
        if success
          # puts @user.saved_change_to_email?
          user.update_token
        else
          errors.merge!(user.errors)
        end
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
