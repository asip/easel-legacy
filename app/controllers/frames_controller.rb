class FramesController < ApplicationController
  skip_before_action :require_login, only: [:show]
  before_action :set_frame, only: [:show, :edit, :update, :destroy]

  def show
  end

  def new
    @frame = Frame.new
  end

  def create
    @frame = Frame.new(frame_params)

    if params[:commit] == '戻る'
      @frame.confirming = ''
      render :new
      return
    end

    @frame.user_id = current_user.id

    if @frame.save
      redirect_to controller: 'dashboard' ,action: :show
    else
      render :new
    end
  end

  def edit
  end

  def update
    if params[:commit] == '戻る'
      @frame.confirming = ''
      render :edit
      return
    end

    @frame.user_id = current_user.id

    if @frame.update(frame_params)
      redirect_to @frame
    else
      render :edit
    end
  end

  def destroy
    @frame.destroy
    redirect_to controller: 'dashboard' ,action: :show
  end

  private

  def frame_params
    params.require(:frame).permit(:name, :tag_list, :comment, :image, :confirming)
  end

  def set_frame
    if action_name == 'show'
      @frame = Frame.find(params[:id])
    else
      @frame = Frame.find_by!(id: params[:id], user_id: current_user.id)
    end
  end
end
