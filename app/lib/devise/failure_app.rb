# frozen_string_literal: true

require_relative "../redirect_overwrite/devise/failure_app"

module Devise
  # Devise::FailureApp class
  class FailureApp
    prepend RedirectOverwrite::Devise::FailureApp
  end
end
