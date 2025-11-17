# frozen_string_literal: true

# errors
module Errors
  # Frame module
  module Frame
    extend ActiveSupport::Concern

    def full_error_messages
      full_error_messages_for(%i[file name tag_list])
    end
  end
end
