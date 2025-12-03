# frozen_string_literal: true

# Users Helper
module UsersHelper
  def self.tzinfo_options
    ActiveSupport::TimeZone.all.map { |tz|
      utc_offset = ActiveSupport::TimeZone.seconds_to_utc_offset(
        Time.current.in_time_zone(tz).utc_offset
      )
      [ "(GMT#{utc_offset})#{tz.name}", tz.tzinfo.name ]
    }
  end
end
