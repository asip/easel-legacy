# frozen_string_literal: true

# page transition
module PageTransition
  # Path module
  module Path
    def self.not_after_login_unsaved_paths?(from)
      !from&.include?("/frames/new") && !from&.include?("/profile") &&
      !from&.include?("/account/password/edit")
    end

    def self.not_before_login_unsaved_paths?(from)
      !from&.include?("/login") && !from&.include?("/signup")
    end
  end
end
