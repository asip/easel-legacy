class FramesController < ApplicationController
  skip_before_action :require_login, only: [:show]
  before_action :set_frame, only: [:show, :new, :create, :edit, :update, :destroy]
  before_action :back_to_form, only: [:create, :update]

  def show
  end

  def new
  end

  def create
    @frame.user_id = current_user.id

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

    if @frame.update(frame_params)
      redirect_to @frame
    else
      render :edit
    end
  end

  def destroy
    @frame.destroy
    redirect_to controller: 'dashboard', action: :show
  end

  private

  def set_frame
    if action_name == 'show'
      @frame = Frame.find(params[:id])
    elsif action_name == 'new'
      @frame = Frame.new
    elsif action_name == 'create'
      @frame = Frame.new(frame_params)
    else
      @frame = Frame.find_by!(id: params[:id], user_id: current_user.id)
    end
  end

  def back_to_form
    if params[:commit] == '戻る'
      @frame.confirming = ''
      if action_name == 'create'
        render :new
      elsif action_name == 'update'
        render :edit
      end
    end
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
