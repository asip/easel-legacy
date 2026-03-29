# frozen_string_literal: true

# TimeZone::Detect module
module TimeZone::Detect
  extend ActiveSupport::Concern
  include TimeZone::Cookie

  included do
    before_action :set_time_zone
  end

  protected

  def set_time_zone
    Time.zone = time_zone
  end
end
