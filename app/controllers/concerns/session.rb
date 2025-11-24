# frozen_string_literal: true

# Session module
module Session
  extend ActiveSupport::Concern

  included do
    helper_method :prev_url
  end

  protected

  def prev_url
    session[:prev_url]
  end

  def prev_url=(prev_url)
    session[:prev_url] = prev_url
  end
end
