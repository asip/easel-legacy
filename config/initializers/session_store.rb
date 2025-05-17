Rails.application.configure do
  config.session_store :cookie_store, key: "_easel_legacy_session", expire_after: 60.minutes.to_i
end
