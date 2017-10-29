class DashboardController < ApplicationController
  def show
    @frames = Frame.page(params[:page])
  end
end
