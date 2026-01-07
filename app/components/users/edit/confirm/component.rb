# frozen_string_literal: true

# users
module Users
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
