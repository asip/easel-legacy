# frozen_string_literal: true

# users
module Users
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
