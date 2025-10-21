# frozen_string_literal: true

# drawer
module Drawer
  # search bar
  module SearchBar
    # Component
    class Component < ViewComponent::Base
      def initialize(word:, day:)
        @word = word
        @day = day
      end
    end
  end
end
