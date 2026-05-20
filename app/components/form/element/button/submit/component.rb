# frozen_string_literal: true

# Form::Element::Button::Submit::Component class
class Form::Element::Button::Submit::Component < ViewComponent::Base
  def initialize(label:)
    @label = label
  end
end
