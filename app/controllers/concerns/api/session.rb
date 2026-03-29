
# frozen_string_literal: true

# Api::Session Module
module Api::Session
  extend ActiveSupport::Concern

  protected

  def access_token
    session[:access_token]
  end

  def access_token=(token)
    session[:access_token] = token
  end
end
