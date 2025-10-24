# frozen_string_literal: true

class PageTransition
  def self.redirect_url(from:)
    if from.include?("/login") || from.include?("/frames/new")||
       from.include?("/profile") || from.include?("/account/password/edit")
      to_path = "/"
    else
      to_path = from
    end

    to_path
  end
end
