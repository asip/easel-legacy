class DashboardController < ApplicationController
  skip_before_action :require_login
  before_action :query_params, only: [:show]

  def show
    @frames = Frame.where(nil)

    if @word.present?
      #@frames = @frames.ransack({ name_or_tags_name_cont: @word}).result(distinct: true)
      relation  = @frames.joins(:tags)
      @frames = relation.merge(ActsAsTaggableOn::Tag.where('tags.name like ?', "%#{@word}%"))
                        .or(relation.where('frames.name like ?', "%#{@word}%")).distinct
    end

    @frames = @frames.page(params[:page])
  end

  private

  def query_params
    @word = params[:q]
  end
end
