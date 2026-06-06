# frozen_string_literal: true

# Popover::Frames::Delete::Component class
class Popover::Frames::Delete::Component < ViewComponent::Base
  def initialize(path:)
    @path = path
  end
end
