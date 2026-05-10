# frozen_string_literal: true

# Display
module Display
  # Image
  module Image
    # Preview
    module Preview
      # Component class
      class Component < ViewComponent::Base
        def initialize(model:)
          @url = get_url(model:)
        end

        private

        def get_url(model:)
          if model.class == Frame && model.file.present?
            url = model.file_proxy_url(:three)
          elsif model.class == User && model.image.present?
            url = model.image_proxy_url(:three)
          else
            url = nil
          end

          url
        end
      end
    end
  end
end
