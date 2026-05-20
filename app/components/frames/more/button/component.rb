# frozen_string_literal: true

# Frames::More::Button::Component class
class Frames::More::Button::Component < ViewComponent::Base
  def initialize(id:, label:, action:, page:, pagy:)
    @id = id
    @label = label
    @action = action
    @page = page
    @pagy = pagy
  end
end
