# frozen_string_literal: true

PATCHES = [ Rails.root.join("app/lib/devise/**/*.rb") ]

Dir[*PATCHES].sort.each do |file|
  require file
end
