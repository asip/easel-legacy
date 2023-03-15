# frozen_string_literal: true

# Preview Component
module ImagePreview
  # Component
  class Component < ViewComponent::Base
    def initialize(model:)
      super
      @model = model
    end
  end
end
