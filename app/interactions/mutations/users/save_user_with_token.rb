# frozen_string_literal: true

# mutations
module Mutations
  # users
  module Users
    # SaveUserWithToken
    class SaveUserWithToken
      include Mutation

      attr_reader :user

      def initialize(user:)
        @user = user
      end

      def execute
        @success = @user.save(context: :with_validation)
        if @success
          # puts @user.saved_change_to_email?
          @user.update_token
        else
          errors.merge!(@user.errors)
        end
      end

      def success?
        @success
      end
    end
  end
end
