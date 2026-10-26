# frozen_string_literal: true

# RedirectOverwrite::Devise::FailureApp module
module RedirectOverwrite
  module Devise
    module FailureApp
      def redirect
        store_location!
        if is_flashing_format?
          if flash[:timedout] && flash[:alert]
            flash.keep(:timedout)
            flash.keep(:alert)
          else
            flash[:alert] = i18n_message
          end
        end
        redirect_to PageTransition::Location::Path.redirect(from: request.referer)
      end
    end
  end
end
