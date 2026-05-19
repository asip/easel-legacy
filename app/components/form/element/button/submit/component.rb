# frozen_string_literal: true

# form
module Form
  # element
  module Element
    # button
    module Button
      # submit
      module Submit
        # Component class
        class Component < ViewComponent::Base
          def initialize(label:)
            @label = label
          end
        end
      end
    end
  end
end
