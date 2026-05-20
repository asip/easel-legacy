# frozen_string_literal: true

# Form::Element::Button::Confirm::Component class
class Form::Element::Button::Confirm::Component < ViewComponent::Base
  def initialize(form:)
    @form = form
  end
end
