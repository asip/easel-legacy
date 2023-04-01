# frozen_string_literal: true

# Users
module Users
  # Preview
  module Preview
    # Image
    module Image
      # Component
      class Component < ViewComponent::Base
        def initialize(user:, original:)
          super
          @user = user
          @original = original
        end
      end
    end
  end
end
