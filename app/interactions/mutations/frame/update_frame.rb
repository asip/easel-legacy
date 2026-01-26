# frozen_string_literal: true

# Mutations::Frame::UpdateFrame class
class Mutations::Frame::UpdateFrame
  include Mutation

  attr_reader :frame

  def initialize(user:, frame_id:, form:)
    @user = user
    @frame_id = frame_id
    @form = form
  end

  def execute
    user_id = @user.id
    frame = Frame.find_by!(id: @frame_id, user_id:)
    frame.attributes = @form
    frame.user_id = user_id
    mutation = Mutations::Frame::SaveFrame.run(frame:)
    errors.merge!(mutation.errors) unless mutation.success?
    self.frame = mutation.frame
  end

  private

  def frame=(frame)
    @frame = frame
  end
end
