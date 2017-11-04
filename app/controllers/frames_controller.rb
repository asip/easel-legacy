class FramesController < ApplicationController
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

  def frame_params
    params.require(:frame).permit(:name, :tag_list, :comment, :image, :confirming)
  end

  private

  def set_frame
    @frame = Frame.find(params[:id])
  end
end
