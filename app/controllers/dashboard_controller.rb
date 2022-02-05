class DashboardController < ApplicationController
  skip_before_action :require_login

  def show
    redirect_to frames_path(query_params)
  end

  def query_params
    params.permit(
      :q,
      :page
    )
  end
end
