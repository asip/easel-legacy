# frozen_string_literal: true

# Frames Controller
class FramesController < ApplicationController
  include Search::Query
  include More
  include DateAndTime::Util

  skip_before_action :require_login, only: %i[index show]
  # rubocop:disable Rails/LexicallyScopedActionFilter
  before_action :set_query, only: %i[index prev next show new edit]
  # rubocop:enable Rails/LexicallyScopedActionFilter
  before_action :set_day, only: [:index]
  before_action :set_frame, only: %i[show new create edit update destroy]
  before_action :back_to_form, only: %i[create update]

  def index
    @frames = Frame.search_by(word: @word)

    @frames = @frames.page(@page)
  end

  def show; end

  def new; end

  def create
    @frame.user_id = current_user.id
    @frame.file_derivatives! if @frame.file.present?
    if @frame.save
      render :show
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    @frame.user_id = current_user.id

    @frame.attributes = frame_params
    @frame.file_derivatives! if @frame.file.present?
    if @frame.save
      redirect_to frame_path(@frame, query_params)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @frame.destroy
    redirect_to root_path(query_params), status: :see_other
  end

  private

  def set_query
    @word = permitted_params[:q]
    @page = permitted_params[:page]
  end

  def set_day
    @day = if @word.blank? || !FramesController.date_valid?(@word)
             '' # Time.zone.now.strftime("%Y/%m/%d")
           else
             @word
           end
  end

  def set_frame
    @frame = case action_name
             when 'show'
               Frame.find(permitted_params[:id])
             when 'new'
               Frame.new
             when 'create'
               Frame.new(frame_params)
             else
               Frame.find_by!(id: permitted_params[:id], user_id: current_user.id)
             end
  end

  def back_to_form
    return unless permitted_params[:commit] == '戻る'

    @frame.confirming = ''
    @frame.attributes = frame_params
    @frame.file_derivatives! if @frame.file.present?
    case action_name
    when 'create'
      render :new
    when 'update'
      render :edit
    end
  end

  # rubocop:disable Metrics/MethodLength
  def permitted_params
    params.permit(
      :id,
      :q,
      :page,
      :commit,
      :tag_editor,
      :_method,
      :authenticity_token,
      frame: %i[
        name
        tag_list
        comment
        file
        shooted_at
        confirming
      ]
    )
  end
  # rubocop:enable Metrics/MethodLength

  def frame_params
    permitted_params[:frame]
  end
end
