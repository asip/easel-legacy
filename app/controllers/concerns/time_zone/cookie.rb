# frozen_string_literal: true

# TimeZone::Cookie module
module TimeZone::Cookie
  extend ActiveSupport::Concern

  protected

  def time_zone
    # puts cookies.to_h
    cookies[:time_zone]
  end
end
