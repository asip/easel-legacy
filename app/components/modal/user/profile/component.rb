# frozen_string_literal: true

# modal
module Modal
  # user
  module User
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
