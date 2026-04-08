# frozen_string_literal: true

# timezone
Rails.application.config do |config|
  config.active_record.default_timezone = :local
  config.time_zone = "Asia/Tokyo"
end
