# frozen_string_literal: true

# mutations
module Mutations
  # frames
  module Frames
    # SaveFrame
    class SaveFrame
      include Mutation

      attr_reader :frame

      def initialize(user:, frame:)
        @user = user
        self.frame = frame
      end

      def execute
        frame.user_id = @user.id
        self.success = frame.save
        return if success

        errors.merge!(frame.errors)
      end

      def success?
        success
      end

      private

      attr_accessor :success

      def frame=(frame)
        @frame = frame
      end
    end
  end
end
