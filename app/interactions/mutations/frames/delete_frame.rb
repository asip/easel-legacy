# frozen_string_literal: true

# Mutations::Frames::DeleteFrame class
class Mutations::Frames::DeleteFrame
  include Mutation

  attr_reader :frame

  def initialize(user:, frame_id:)
    @user = user
    @frame_id = frame_id
  end

  def execute
    frame = Frame.find_by!(id: @frame_id, user_id: @user.id)
    frame.destroy
    self.frame = frame
  end

  private

  def frame=(frame)
    @frame = frame
  end
end
