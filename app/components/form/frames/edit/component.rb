# frozen_string_literal: true

# Form::Frames::Edit::Component class
class Form::Frames::Edit::Component < ViewComponent::Base
  def initialize(frame:)
    @frame = frame
  end
end
