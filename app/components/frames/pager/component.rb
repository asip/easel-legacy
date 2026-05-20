# frozen_string_literal: true

# Frames::Pager::Component class
class Frames::Pager::Component < ViewComponent::Base
  def initialize(pagy:)
    @pagy = pagy
  end
end
