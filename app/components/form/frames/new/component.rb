# frozen_string_literal: true

# Form::Frames::New::Component class
class Form::Frames::New::Component < ViewComponent::Base
  def initialize(frame:)
    @frame = frame
  end
end
