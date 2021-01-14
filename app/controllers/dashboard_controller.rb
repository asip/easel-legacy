class DashboardController < ApplicationController
  skip_before_action :require_login
  before_action :query_params, only: [:show]

  def show
    @frames = Frame.where(nil)

    if @word.present?
      #@frames = @frames.ransack({ name_or_tags_name_cont: @word}).result(distinct: true)
      @frames = @frames.joins(:tags)
                     .merge(ActsAsTaggableOn::Tag.where('tags.name like ?', "%#{@word}%"))
                     .or(Frame.where('frames.name like ?', "%#{@word}%")).distinct
      #@frames = Frame.includes(:tags)
      #              .where(tags: {name: @word})
      #              .or(Frame.where('frames.name like ?', "%#{@word}%")).distinct
    end

    @frames = @frames.page(params[:page])
  end

  private

  def query_params
    @word = params[:q]
  end
end
