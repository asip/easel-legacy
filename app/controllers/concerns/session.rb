# frozen_string_literal: true

# Session module
module Session
  extend ActiveSupport::Concern

  included do
    helper_method :prev_url
  end

  protected

  def prev_url_for(path:)
    session["prev_url[#{path}]".to_sym]
  end

  def prev_url
    prev_url_for(path: request.path)
  end

  def prev_url=(prev_url)
    session["prev_url[#{request.path}]".to_sym] = prev_url
  end
end
