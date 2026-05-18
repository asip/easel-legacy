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
    Time.zone = cookies[:time_zone]
  end

  def time_zone
    Time.zone
  end
end
