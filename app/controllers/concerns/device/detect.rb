# frozen_string_literal: true

# Device::Detect module
module Device::Detect
  extend ActiveSupport::Concern

  included do
    before_action :set_request_variant
  end

  private

  # It is useful for Action Pack variants, which is new feature from Rails 4.1.
  # You can switch view templates by +pc or +smartphone in file name.
  # http://guides.rubyonrails.org/4_1_release_notes.html#action-pack-variants
  def set_request_variant
    request.variant = request.device_variant # :pc, :smartphone
  end
end
