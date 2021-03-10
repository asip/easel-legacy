class DashboardController < ApplicationController
  skip_before_action :require_login
  before_action :query_params, only: [:show]

  def show
    @frames = Frame.where(nil)

    if @word.present?
      #@frames = @frames.ransack({ name_or_tags_name_cont_or_users_name: @word}).result(distinct: true)
      @frames = @frames.joins(:tags, :user)
                     .merge(ActsAsTaggableOn::Tag.where('tags.name like ?', "%#{@word}%"))
                     .or(Frame.where('frames.name like ?', "%#{@word}%"))
                     .or(User.where(name: @word))
      ##@frames = Frame.includes(:tags, :user)
      ##              .where(tags: {name: @word})
      ##              .or(Frame.where('frames.name like ?', "%#{@word}%"))
      ##              .or(User.where(name: @word))
      ##              .distinct
      #@frames = Frame.includes(:tags, :user).references(:tags, :user)
      #            .where('tags.name like ?', "%#{@word}%")
      #            .or(Frame.where('frames.name like ?', "%#{@word}%"))
      #            .or(User.where(name: @word))

    end

    @frames = @frames.page(params[:page])
  end

  private

  def query_params
    @word = params[:q]
  end
end
