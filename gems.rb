source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.1.0'
# gem 'rails', github: 'rails/rails'
# gem 'mini_magick'
# gem 'activestorage'
# Use mysql as the database for Active Record
gem 'mysql2', '~> 0.5.3'
# Use Puma as the app server
gem 'puma', '~> 5.1.1'
# Reduces boot times through caching; configured in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false
# Use SCSS for stylesheets
gem 'sassc-rails', '~> 2.1.2'
# Use CoffeeScript for .js.coffee assets and views
# gem 'coffee-rails'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 5'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Refile  don't support Ruby3.0.0 yet
gem 'refile', github: 'refile/refile' , require: 'refile/rails'
gem "refile-mini_magick"

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5.2.1'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# i18n
gem 'rails-i18n', '~> 6.0.0'

# error page handling
gem 'rambulance'

# authentication
gem 'sorcery'

# settings
gem 'config'

# paging
gem 'kaminari', '~> 1.2.1'
gem 'bootstrap4-kaminari-views'

# tags
#gem 'acts-as-taggable-on', '~> 6.5.0'
gem 'acts-as-taggable-on',  github: 'mbleigh/acts-as-taggable-on'

# search
# gem 'ransack'

# json
gem 'fast_jsonapi'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.3'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'annotate'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]