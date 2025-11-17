# frozen_string_literal: true

# errors
module Errors
  # User module
  module User
    extend ActiveSupport::Concern

    def full_error_messages
      full_error_messages_for(%i[image name email current_password password password_confirmation])
    end
  end
end
