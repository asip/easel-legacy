# frozen_string_literal: true

# comments
module Comments
  # Component
  class Component < ViewComponent::Base
    def initialize(frame:)
      @frame = frame
    end
  end
end
