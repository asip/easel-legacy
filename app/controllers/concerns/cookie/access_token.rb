
# frozen_string_literal: true

# cookie/AccessToken Module
module Cookie::AccessToken
  extend ActiveSupport::Concern

  protected

  def access_token
    cookies[:access_token]
  end

  def access_token=(token)
    cookies[:access_token] = { value: token, expires: 60.minutes.from_now, http_only: true }
  end
end
