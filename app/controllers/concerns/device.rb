# frozen_string_literal: true

# Device Module
module Device
  extend ActiveSupport::Concern

  included do
    helper_method :popover?
  end

  protected

  def device_type
    @device_type ||= request.device_type
  end

  def os
    @os ||= request.os
  end

  def os_version
    @os_version ||= request.os_version
  end

  def browser
    @browser ||= request.browser
  end

  def browser_version
    @browser_version ||= request.browser_version.to_f
  end

  def popover?
    (browser == "Safari" && browser_version >= 26.2) ||
    ((browser == "Chrome" || browser == "Edge") && browser_version >= 135) ||
    (browser == "Firefox" && browser_version >= 144)
  end
end
