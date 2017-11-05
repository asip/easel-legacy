class DashboardController < ApplicationController
  before_action :query_params, only: [:show]

  def show
    @frames = Frame.page(params[:page])

    if @word.present?
      @frames = @frames.ransack({ name_or_tags_name_cont: @word}).result(distinct: true)
    end
  end

  def query_params
    @word = params[:q]
  end
end
