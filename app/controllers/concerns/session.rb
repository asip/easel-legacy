module Session
  extend ActiveSupport::Concern

  included do
    helper_method :prev_url
  end

  protected

  def prev_url
    session[:prev_url]
  end
end
