class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login

  def query_params
    params.permit(
      :q,
      :page
    )
  end
  helper_method :query_params

  protected

  def not_authenticated
    redirect_to root_path
  end
end
