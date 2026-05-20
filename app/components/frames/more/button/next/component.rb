# frozen_string_literal: true

# Frames::More::Button::Next::Component class
class Frames::More::Button::Next::Component < ViewComponent::Base
  def initialize(pagy:)
    @pagy = pagy
  end
end
