# frozen_string_literal: true

# Cookie Module
module Cookie
  extend ActiveSupport::Concern
  include Frames::Cookie
  include PageTransition::Cookie
end
