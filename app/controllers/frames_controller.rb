class FramesController < ApplicationController
  skip_before_action :require_login, only: [:index, :more, :show]
  before_action :set_query, only: [:index, :more, :show, :new, :edit]
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

  def more
    index
    render layout: false, content_type: 'text/vnd.turbo-stream.html'
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
    redirect_to root_path(query_params), status: :see_other
  end

  private

  def set_query
    params_query = query_params
    @word = params_query[:q]
    @page = params_query[:page]
  end

  def set_frame
    @frame = if action_name == "show"
      Frame.find(permitted_params[:id])
    elsif action_name == "new"
      Frame.new
    elsif action_name == "create"
      Frame.new(frame_params)
    else
      Frame.find_by!(id: permitted_params[:id], user_id: current_user.id)
    end
  end

  def back_to_form
    if permitted_params[:commit] == "戻る"
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

  def permitted_params
    params.permit(
      :id,
      :q,
      :page,
      :commit,
      :tag_editor,
      :_method,
      :authenticity_token,
      frame: [
        :name,
        :tag_list,
        :comment,
        :image,
        :confirming
      ]
    )
  end

  def frame_params
    permitted_params[:frame]
  end
end
