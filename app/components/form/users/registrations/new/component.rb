# frozen_string_literal: true

# form
module Form
  # users
  module Users
    # registrations
    module Registrations
      # new
      module New
        # Component class
        class Component < ViewComponent::Base
          def initialize(resource:, resource_name:)
            @resource = resource
            @resource_name = resource_name
          end
        end
      end
    end
  end
end
