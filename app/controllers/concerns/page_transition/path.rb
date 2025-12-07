# frozen_string_literal: true

# page transition
module PageTransition
  # Path module
  module Path
    protected

    def not_after_login_unsaved_paths?(from)
      !from&.include?("/frames/new") && !from&.include?("/profile") &&
      !from&.include?("/account/password/edit")
    end

    def not_before_login_unsaved_paths?(from)
      !from&.include?("/login") && !from&.include?("/signup")
    end
  end
end
