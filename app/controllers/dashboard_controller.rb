# frozen_string_literal: true

# Dashboard Controller
class DashboardController < ApplicationController
  include Query::Search

  skip_before_action :require_login

  def show
    redirect_to frames_path(query_params)
  end

  def permitted_params
    params.permit(
      :q,
      :page,
      :_method,
      :authenticity_token
    )
  end
end
