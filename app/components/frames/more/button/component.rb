module Frames
  # more
  module More
    # Button
    module Button
      # Component class
      class Component < ViewComponent::Base
        def initialize(id:, label:, action:, page:, pagy:)
          @id = id
          @label = label
          @action = action
          @page = page
          @pagy = pagy
        end
      end
    end
  end
end
