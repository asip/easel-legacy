# frozen_string_literal: true

# devise
module Devise
  # Failure App
  class FailureApp
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
      redirect_to PageTransition.redirect_url(request)
    end
  end
end
