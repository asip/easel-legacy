# frozen_string_literal: true

# Users
module Users
  # Edit
  module Edit
    # Input
    module Input
      # Component
      class Component < ViewComponent::Base
        def initialize(user:, form:, back_to_path:)
          super
          @user = user
          @form = form
          @back_to_path = back_to_path
        end
      end
    end
  end
end
