# frozen_string_literal: true

# Preview
module Preview
  # Image
  module Image
    # Component class
    class Component < ViewComponent::Base
      def initialize(model:)
        @img_url = get_url(model:)
      end

      private

      def get_url(model:)
        if model.class == Frame && model.file.present?
          img_url = model.file_proxy_url(:three)
        elsif model.class == User && model.image.present?
          img_url = model.image_proxy_url(:three)
        else
          img_url = nil
        end

        img_url
      end
    end
  end
end
