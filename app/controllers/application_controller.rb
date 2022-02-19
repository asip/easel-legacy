class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login
  before_action :token_confirmation

  def query_list
    [:page, :q]
  end
  helper_method :query_list

  def query_params
    params.permit(
      :id,
      :q,
      :page,
      :commit,
      :tag_editor,
      frame: [
        :name,
        :tag_list,
        :comment,
        :image,
        :confirming
      ]
    )
  end
  helper_method :query_params

  protected

  def not_authenticated
    redirect_to root_path
  end

  def token_confirmation
    return if current_user.blank?
    if current_user && current_user.token_expire?
      current_user.reset_token
      logout
    end
  end
end
