class FramesController < ApplicationController
  skip_before_action :require_login, only: [:index, :show]
  before_action :set_query, only: [:index]
  before_action :set_frame, only: [:show, :new, :create, :edit, :update, :destroy]
  before_action :back_to_form, only: [:create, :update]

  def index
    @frames = Frame.where(nil)

    if @word.present?
      # @frames = @frames.ransack({ name_or_tags_name_cont_or_users_name: @word}).result(distinct: true)
      @frames = @frames.joins(:tags, :user)
        .merge(ActsAsTaggableOn::Tag.where("tags.name like ?", "%#{@word}%"))
        .or(Frame.where("frames.name like ?", "%#{@word}%"))
        .or(User.where(name: @word))
      # #@frames = Frame.includes(:tags, :user)
      ##              .where(tags: {name: @word})
      ##              .or(Frame.where('frames.name like ?', "%#{@word}%"))
      ##              .or(User.where(name: @word))
      ##              .distinct
      # @frames = Frame.includes(:tags, :user).references(:tags, :user)
      #            .where('tags.name like ?', "%#{@word}%")
      #            .or(Frame.where('frames.name like ?', "%#{@word}%"))
      #            .or(User.where(name: @word))

    end

    @frames = @frames.page(@page)
  end

  def show
  end

  def new
  end

  def create
    @frame.user_id = current_user.id
    @frame.image_derivatives!

    if @frame.save
      render :show
    else
      render :new
    end
  end

  def edit
  end

  def update
    @frame.user_id = current_user.id

    @frame.attributes = frame_params
    @frame.image_derivatives!
    if @frame.save
      redirect_to @frame
    else
      render :edit
    end
  end

  def destroy
    @frame.destroy
    redirect_to controller: "dashboard", action: :show
  end

  private

  def set_query
    query_params = params_query
    @word = query_params[:q]
    @page = query_params[:page]
  end

  def set_frame
    @frame = if action_name == "show"
      Frame.find(params[:id])
    elsif action_name == "new"
      Frame.new
    elsif action_name == "create"
      Frame.new(frame_params)
    else
      Frame.find_by!(id: params[:id], user_id: current_user.id)
    end
  end

  def back_to_form
    if params[:commit] == "戻る"
      @frame.confirming = ""
      @frame.attributes = frame_params
      @frame.image_derivatives!
      if action_name == "create"
        render :new
      elsif action_name == "update"
        render :edit
      end
    end
  end

  def params_query
    params.permit(
      :q,
      :page
    )
  end

  def frame_params
    params.require(:frame).permit(
      :name,
      :tag_list,
      :comment,
      :image,
      :confirming
    )
  end
end
