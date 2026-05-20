# frozen_string_literal: true

# Form::Frames::New::Input::Component class
class Form::Frames::New::Input::Component < ViewComponent::Base
  def initialize(frame:, form:, back_to_path:)
    @frame = frame
    @form = form
    @back_to_path = back_to_path
  end
end
