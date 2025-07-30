# frozen_string_literal: true

# users
module Users
  # new
  module New
    # confirm
    module Confirm
      # Component
      class Component < ViewComponent::Base
        def initialize(user:, form:)
          @user = user
          @form = form
        end
      end
    end
  end
end
