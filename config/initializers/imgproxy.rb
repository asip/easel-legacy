require "imgproxy"

Imgproxy.configure do |config|
  # Full URL to where your imgproxy lives.
  config.endpoint = ENV.fetch("IMGPROXY_ENDPOINT")
  config.use_s3_urls = ENV.fetch("IMGPROXY_USE_S3_URLS")
  # Hex-encoded signature key and salt
end

Imgproxy.extend_shrine!
