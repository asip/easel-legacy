# frozen_string_literal: true

# mutations
module Mutations
  # frames
  module Frames
    # SaveFrame  class
    class SaveFrame
      include Mutation

      attr_reader :frame

      def initialize(frame:)
        self.frame = frame
      end

      def execute
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
