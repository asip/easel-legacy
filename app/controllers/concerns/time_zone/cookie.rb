# frozen_string_literal: true

# TimeZone::Cookie module
module TimeZone::Cookie
  extend ActiveSupport::Concern

  protected

  def time_zone
    # puts cookies.to_h
    # puts cookies[:time_zone]
    cookies[:time_zone]
  end
end
