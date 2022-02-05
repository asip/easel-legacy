class FramesController < ApplicationController
  skip_before_action :require_login, only: [:index, :show]
  before_action :set_query, only: [:index, :show, :new, :edit]
  before_action :set_frame, only: [:show, :new, :create, :edit, :update, :destroy]
  before_action :back_to_form, only: [:create, :update]

  def index
    @frames = Frame.where(nil)

    if @word.present?
      @frames = @frames.joins(:tags, :user)
        .merge(ActsAsTaggableOn::Tag.where("tags.name like ?", "%#{@word}%"))
        .or(Frame.where("frames.name like ?", "%#{@word}%"))
        .or(User.where(name: @word))
    end

    @frames = @frames.page(@page)
  end

  def show
  end

  def new
  end

  def create
    @frame.user_id = current_user.id
    @frame.image_derivatives! if @frame.image.present?
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
    @frame.image_derivatives! if @frame.image.present?
    if @frame.save
      redirect_to frame_path(@frame, query_params), status: :see_other
    else
      render :edit
    end
  end

  def destroy
    @frame.destroy
    redirect_to controller: "dashboard", action: :show, status: :see_other, params: query_params
  end

  private

  def set_query
    params_query = query_params
    @word = params_query[:q]
    @page = params_query[:page]
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
      @frame.image_derivatives! if @frame.image.present?
      if action_name == "create"
        render :new
      elsif action_name == "update"
        render :edit
      end
    end
  end

  def query_params
    params.permit(
      :q,
      :page
    )
  end
  helper_method :query_params

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
