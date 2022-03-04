source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.0"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use mysql as the database for Active Record
gem "mysql2", "~> 0.5.3"
# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.6.2"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
# gem "jbuilder"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

gem "jsbundling-rails"
gem "cssbundling-rails"

# view component
gem "view_component"

# Shrine
gem "shrine", "~> 3.0"
gem "image_processing", "~> 1.8"

# i18n
gem "rails-i18n", "~> 7.0.0"

# error page handling
gem "rambulance"

# authentication
gem "sorcery"
gem "sorcery-jwt"

# settings
gem "config"

# paging
gem "kaminari", "~> 1.2.2"
gem "bootstrap5-kaminari-views"

# tags
# gem "acts-as-taggable-on", github: "mbleigh/acts-as-taggable-on"
gem "acts-as-taggable-on", "~> 9.0.1"

# search
# gem 'ransack'

# json
gem "jsonapi-serializer"

# soft delete
# gem 'discard', '~> 1.2'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "debug", platforms: %i[mri mingw x64_mingw]
  # Ruby style guide, linter, and formatter
  gem "standard"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  gem "annotate"
  gem "rspec-rails"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
