unless ENV['BUNDLE_GEMFILE'] && File.exist?(ENV['BUNDLE_GEMFILE'])
  ENV['BUNDLE_GEMFILE'] = File.expand_path('../gems.rb', __dir__ )
end
unless File.exist?(ENV['BUNDLE_GEMFILE'])
  ENV['BUNDLE_GEMFILE'] = File.expand_path('../Gemfile', __dir__)
end

require "bundler/setup" # Set up gems listed in the Gemfile.
