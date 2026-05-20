# frozen_string_literal: true

# Form::Frames::New::Confirm::Component class
class Form::Frames::New::Confirm::Component < ViewComponent::Base
  def initialize(frame:, form:)
    @frame = frame
    @form = form
    @tag_map = Frame.tag_map(frame: @frame)
  end
end
