class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login

  protected

  def not_authenticated
    redirect_to root_path
  end
end
