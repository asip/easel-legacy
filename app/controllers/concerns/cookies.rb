# frozen_string_literal: true

# Cookie Module
module Cookies
  extend ActiveSupport::Concern
  include Frames::Cookies
  include PageTransition::Cookies
end
