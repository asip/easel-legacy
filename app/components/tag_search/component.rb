# frozen_string_literal: true

# tag search
module TagSearch
  # Component
  class Component < ViewComponent::Base
    def initialize(word:)
      @word = word
    end
  end
end
