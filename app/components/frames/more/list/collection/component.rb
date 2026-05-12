# frames
module Frames
  # more
  module More
    # list
    module List
      # collection
      module Collection
        # Component class
        class Component < ViewComponent::Base
          with_collection_parameter :frame

          def initialize(frame:, tag: true, from:, pagy:)
            @frame = frame
            @tag = tag
            @from = from
            @pagy = pagy
          end
        end
      end
    end
  end
end
