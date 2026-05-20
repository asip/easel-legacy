# frozen_string_literal: true

# Frames::More::Button::Prev::Component class
class Frames::More::Button::Prev::Component < ViewComponent::Base
  def initialize(pagy:)
    @pagy = pagy
  end
end
