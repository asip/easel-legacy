# frozen_string_literal: true

# Mutations::Frames::SaveFrame class
class Mutations::Frames::SaveFrame
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
