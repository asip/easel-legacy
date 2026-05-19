# frozen_string_literal: true

# form
module Form
  # eelment
  module Element
    # link
    module Link
      # back
      module Back
        # Component class
        class Component < ViewComponent::Base
          def initialize(url:)
            @url = url
          end
        end
      end
    end
  end
end
