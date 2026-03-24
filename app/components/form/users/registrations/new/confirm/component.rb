# frozen_string_literal: true

# form
module Form
  # users
  module Users
    # registrations
    module Registrations
      # new
      module New
        # confirm
        module Confirm
          # Component class
          class Component < ViewComponent::Base
            def initialize(user:, form:)
              @user = user
              @form = form
            end
          end
        end
      end
    end
  end
end
