# frozen_string_literal: true

# Display::Image::Preview::Component class
class Display::Image::Preview::Component < ViewComponent::Base
  def initialize(model:)
    @url = get_url(model:)
  end

  private

  def get_url(model:)
    model_class = model.class
    if model_class == Frame && model.file.present?
      url = model.file_proxy_url(:three)
    elsif model_class == User && model.image.present?
      url = model.image_proxy_url(:three)
    else
      url = nil
    end

    url
  end
end
