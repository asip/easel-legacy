# frozen_string_literal: true

# form
module Form
  # users
  module Users
    # registrations
    module Registrations
      # edit
      module Edit
        # input
        module Input
          # Component class
          class Component < ViewComponent::Base
            def initialize(user:, form:, back_to_path:)
              @user = user
              @form = form
              @back_to_path = back_to_path
            end
          end
        end
      end
    end
  end
end
