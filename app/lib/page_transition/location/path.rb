# frozen_string_literal: true

# PageTransition::Location::Path class
class PageTransition::Location::Path
  def self.redirect(from:)
    if from.blank?
      to_path = "/admins/sign_in"
    elsif from.include?("/login") || from.include?("/frames/new")||
       from.include?("/profile") || from.include?("/account/password/edit")
      to_path = "/"
    else
      to_path = from
    end

    to_path
  end

  def self.saved_after_login?(from)
    !from&.include?("/frames/new") && !from&.include?("/profile") &&
    !from&.include?("/account/password/edit")
  end

  def self.saved_before_login?(from)
    !from&.include?("/login") && !from&.include?("/signup")
  end
end
