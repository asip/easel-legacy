# frozen_string_literal: true

# Tag Search
module TagSearch
  # Component
  class Component < ViewComponent::Base
    def initialize(word:, path:)
      super
      @word = word
      @path = path
    end
  end
end
