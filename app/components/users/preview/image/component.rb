# frozen_string_literal: true

# users
module Users
  # preview
  module Preview
    # image
    module Image
      # Component
      class Component < ViewComponent::Base
        def initialize(user:, original:)
          @user = user
          @original = original
        end
      end
    end
  end
end
