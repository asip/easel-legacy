# frozen_string_literal: true

# Users
module Users
  # New
  module New
    # Confirm
    module Input
      # Component
      class Component < ViewComponent::Base
        def initialize(form:, user:, back_to_path:)
          super
          @form = form
          @user = user
          @back_to_path = back_to_path
        end
      end
    end
  end
end
