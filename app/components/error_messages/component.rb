# frozen_string_literal: true

# Error Messages
module ErrorMessages
  # Component
  class Component < ViewComponent::Base
    def initialize(model:)
      super
      @model = model
    end
  end
end
