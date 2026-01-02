# frozen_string_literal: true

# api/authentication/frames/skip module
module Api::Authentication::Frames::Skip
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate, only: [ :comments ]
  end
end
