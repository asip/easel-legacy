# frozen_string_literal: true

# TimeZone::Detect module
module TimeZone::Detect
  extend ActiveSupport::Concern

  included do
    before_action :set_time_zone
  end

  protected

  def set_time_zone
    # puts cookies.to_h
    # puts cookies[:time_zone]
    Time.zone = cookies[:time_zone]
  end
end
