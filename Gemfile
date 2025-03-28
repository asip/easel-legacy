# frozen_string_literal: true

source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.2.2"

# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft", "~> 1.1.0"

# gem 'dartsass-rails'

# Use mysql as the database for Active Record
# gem 'mysql2', '~> 0.5.6'
# Use postgresql as the database for Active Record
gem "pg", "~> 1.5.9"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 6.5.0"

# HTTP/2 proxy
gem "thruster", "~> 0.1.9"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails", "~> 2.0.11"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails", "~> 1.3.4"

# Turbo Mount
gem "turbo-mount", "~> 0.4.1"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
# gem "jbuilder"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.13.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[windows jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", "~> 1.18.4", require: false

gem "cssbundling-rails", "~> 1.4.1"
gem "jsbundling-rails", "~> 1.3.1"

# view component
gem "view_component", "~> 3.21.0"

# Shrine
gem "aws-sdk-s3", "~> 1.176.1"
gem "image_processing", "~> 1.13.0"
gem "shrine", "~> 3.6.0"

# i18n
gem "rails-i18n", "~> 7.0.10"

# error page handling
gem "rambulance", "~> 3.3.0"

# authentication
gem "sorcery", "~> 0.16.5"
gem "sorcery-jwt", "~> 0.1.13"

gem "googleauth", "~> 1.12.2"

# settings
gem "config", "~> 5.5.2"

# paging
gem "pagy", "~> 9.3.3"

# tags
# gem "acts-as-taggable-on", github: "mbleigh/acts-as-taggable-on"
gem "acts-as-taggable-on", "~> 12.0.0"

# json
gem "jsonapi-serializer", "~> 2.2.0"

# Rack::Locale
gem "rack-contrib", "2.5.0"

# cors
gem "rack-cors", "~> 2.0.2"

# soft delete
gem "discard", "~> 1.4.0"

# management console
gem "rails_admin", "3.3.0"

gem "mutex_m", "~> 0.3.0"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "debug", "~> 1.10.0", platforms: %i[mri windows], require: "debug/prelude"
  # Ruby style guide, linter, and formatter
  gem "rspec-rails", "~> 7.1.0"
end

group :development do
  gem "brakeman", "~> 7.0.0", require: false
  gem "bullet", "~> 8.0.0"
  gem "pg_query", "~> 6.0.0"
  gem "prosopite", "~> 1.4.2"

  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console", "~> 4.2.1"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  gem "annotate", "~> 3.2.0"
  gem "rails-erd", "~> 1.7.2"

  gem "rubocop-rails-omakase", "~> 1.0.0", require: false
  # Shopify/erb-lint
  gem "erb_lint", "~> 0.7.0", require: false
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara", "~> 3.40.0"
  gem "selenium-webdriver", "~> 4.27.0"
end
