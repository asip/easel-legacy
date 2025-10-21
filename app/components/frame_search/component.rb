# frozen_string_literal: true

# frame search
module FrameSearch
  # Component
  class Component < ViewComponent::Base
    def initialize(word:)
      @word = word
    end
  end
end
