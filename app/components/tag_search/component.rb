# frozen_string_literal: true

# tag search
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
