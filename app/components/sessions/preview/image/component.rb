# frozen_string_literal: true

# Sessions
module Sessions
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
