# frozen_string_literal: true

# Frames::Profile::Component class
class Frames::Profile::Component < ViewComponent::Base
  def initialize(frame:)
    @frame = frame
  end
end
