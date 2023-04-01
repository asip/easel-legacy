# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins %w[http://localhost:3000 http://localhost:3030]

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             expose: ['X-CSRF-Token'],
             credentials: true
  end
end
