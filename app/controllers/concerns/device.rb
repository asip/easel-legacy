# frozen_string_literal: true

# Device Module
module Device
  extend ActiveSupport::Concern

  included do
    helper_method :device
  end

  protected

  def device
    Client::Device.from(request)
  end
end
