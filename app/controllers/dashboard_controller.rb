class DashboardController < ApplicationController
  before_action :query_params, only: [:show]

  def show
    if @word.present?
      @frames = Frame.tagged_with(@word).page(params[:page])
    else
      @frames = Frame.page(params[:page])
    end
  end

  def query_params
    @word = params[:word]
  end
end
