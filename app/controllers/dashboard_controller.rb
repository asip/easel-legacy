class DashboardController < ApplicationController
  skip_before_action :require_login

  def show
    redirect_to frames_path
  end
end
