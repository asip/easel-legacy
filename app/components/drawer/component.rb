# frozen_string_literal: true

# drawer
module Drawer
  # Component
  class Component < ViewComponent::Base
    def initialize(day:)
      super
      @day = day
    end
  end
end
