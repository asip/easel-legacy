# frozen_string_literal: true

# Session::Account class
class Session::Account
  def initialize(session)
    @session = session
  end

  def access_token
    @session[:access_token]
  end

  def access_token=(token)
    @session[:access_token] = token
  end

  def self.from(session)
    self.new(session)
  end
end
