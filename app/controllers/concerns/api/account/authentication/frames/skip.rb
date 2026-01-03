# frozen_string_literal: true

# api/account/authentication/frames/skip module
module Api::Account::Authentication::Frames::Skip
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate, only: [ :comments ]
  end
end
