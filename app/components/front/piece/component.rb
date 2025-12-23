# frozen_string_literal: true

# front
module Front
  # piece
  module Piece
    # Component
    class Component < ViewComponent::Base
      def initialize(path:)
        @path = path
      end
    end
  end
end
