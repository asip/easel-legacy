# frozen_string_literal: true

# Jwt::Refresh module
module Jwt::Refresh
  extend ActiveSupport::Concern

  included do
    before_action :refresh_token
  end

  protected

  def refresh_token
    self.access_token = current_user.create_token if user_signed_in?
  end
end
