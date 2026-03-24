# frozen_string_literal: true

module Form
  # users
  module Users
    # registrations
    module Registrations
      # edit
      module Edit
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
