# frozen_string_literal: true

# Form::Frames::Edit::Confirm::Component class
class Form::Frames::Edit::Confirm::Component < ViewComponent::Base
  def initialize(frame:, form:)
    @frame = frame
    @form = form
    @tag_map = Frame.tag_map(frame: @frame)
  end
end
