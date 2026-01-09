# frozen_string_literal: true

# front
module Front
  # svelte
  module Svelte
    # Component class
    class Component < ViewComponent::Base
      def initialize(path:, view_data: {})
        @path = path
        @view_data = view_data || {}
      end
    end
  end
end
