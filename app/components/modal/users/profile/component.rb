# frozen_string_literal: true

# modal
module Modal
  # users
  module Users
    # Profile
    module Profile
      # Component class
      class Component < ViewComponent::Base
        def initialize(user:)
          @user = user
        end
      end
    end
  end
end
