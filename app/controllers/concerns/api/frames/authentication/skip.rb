# frozen_string_literal: true

# Api::Frames::Authentication::Skip module
module Api::Frames::Authentication::Skip
  extend ActiveSupport::Concern

  SKIP_ACTION_LIST_FOR_AUTH = [ :comments ]

  included do
    skip_before_action :authenticate, only: SKIP_ACTION_LIST_FOR_AUTH
  end
end
