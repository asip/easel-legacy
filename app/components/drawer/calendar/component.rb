# frozen_string_literal: true

# drawer
module Drawer
  # calendar
  module Calendar
    # Component
    class Component < ViewComponent::Base
      def initialize(day:)
        @day = day
      end
    end
  end
end
