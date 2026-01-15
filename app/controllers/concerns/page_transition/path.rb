# frozen_string_literal: true

# page transition
module PageTransition
  # Path module
  module Path
    def self.not_unsaved_paths_after_login?(from)
      !from&.include?("/frames/new") && !from&.include?("/profile") &&
      !from&.include?("/account/password/edit")
    end

    def self.not_unsaved_paths_before_login?(from)
      !from&.include?("/login") && !from&.include?("/signup")
    end
  end
end
