# frozen_string_literal: true

class PageTransition
  def self.redirect_url(request)
    from_path = request.referer

    to_path = from_path

    if from_path.include?("/frames/new") || from_path.include?("/profile") ||
       from_path.include?("/account/password/edit")
      to_path = "/"
    end

    to_path
  end
end
