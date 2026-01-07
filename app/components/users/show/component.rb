# frozen_string_literal: true

# users
module Users
  # show
  module Show
    # Component class
    class Component < ViewComponent::Base
      def initialize(user:)
        @user = user
      end
    end
  end
end
