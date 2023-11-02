# frozen_string_literal: true

# users
module Users
  # edit
  module Edit
    # input
    module Input
      # Component
      class Component < ViewComponent::Base
        def initialize(user:, form:, back_to_path:)
          super
          @user = user
          @form = form
          @back_to_path = back_to_path
        end
      end
    end
  end
end
