# frozen_string_literal: true

# sessions
module Sessions
  # show
  module Show
    # Component
    class Component < ViewComponent::Base
      def initialize(user:)
        @user = user
      end
    end
  end
end
