# frozen_string_literal: true

# Api::Frames::Authentication::Skip module
module Api::Frames::Authentication::Skip
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate, only: [ :comments ]
  end
end
