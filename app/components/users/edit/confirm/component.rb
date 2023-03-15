# frozen_string_literal: true

# Users
module Users
  # Edit
  module Edit
    # Confirm
    module Confirm
      # Component
      class Component < ViewComponent::Base
        def initialize(user:, form:)
          super
          @user = user
          @form = form
        end
      end
    end
  end
end
