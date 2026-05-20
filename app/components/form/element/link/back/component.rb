# frozen_string_literal: true

# Form::Element::Link::Back::Component class
class Form::Element::Link::Back::Component < ViewComponent::Base
  def initialize(url:)
    @url = url
  end
end
