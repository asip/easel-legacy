# frozen_string_literal: true

# form
module Form
  # eelment
  module Element
    # button
    module Button
      # back
      module Back
        # Component class
        class Component < ViewComponent::Base
          def initialize(form:)
            @form = form
          end
        end
      end
    end
  end
end
