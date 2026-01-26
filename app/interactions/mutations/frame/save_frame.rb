# frozen_string_literal: true

# Mutations::Frame::SaveFrame class
class Mutations::Frame::SaveFrame
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
