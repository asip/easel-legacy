# frozen_string_literal: true

# Form::Element::Button::Back::Component class
class Form::Element::Button::Back::Component < ViewComponent::Base
  def initialize(form:)
    @form = form
  end
end
