class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login
  before_action :token_confirmation

  def query_list
    [:page, :q]
  end
  helper_method :query_list

  def permitted_params
    params.permit(
      :id,
      :q,
      :page,
      :commit,
      :tag_editor,
      :_method,
      :authenticity_token,
      frame: [
        :name,
        :tag_list,
        :comment,
        :image,
        :confirming
      ]
    )
  end

  def query_params
    permitted_params.to_h.filter { |key, value| 
      query_list.include?(key.to_sym)
    }
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
