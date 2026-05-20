# frozen_string_literal: true

# Frames::Show::Component class
class Frames::Show::Component < ViewComponent::Base
  def initialize(frame:)
    @frame = frame
    @tag_map = Frame.tag_map(frame: @frame)
  end
end
