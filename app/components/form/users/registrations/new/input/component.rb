# frozen_string_literal: true

# form
module Form
  # users
  module Users
    # registrations
    module Registrations
      # new
      module New
        # input
        module Input
          # Component class
          class Component < ViewComponent::Base
            def initialize(form:, user:, back_to_path:)
              @form = form
              @user = user
              @back_to_path = back_to_path
            end
          end
        end
      end
    end
  end
end
