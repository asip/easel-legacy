# frozen_string_literal: true

require_relative "../redirect_overwrite/devise/failure_app"

# Devise::FailureApp
module Devise
  class FailureApp
    prepend RedirectOverwrite::Devise::FailureApp
  end
end
