# frozen_string_literal: true

# Frames Controller
class FramesController < ApplicationController
  include Frames::Query::PaginationQuery
  include Query::Search
  include More
  include DateAndTime::Util

  skip_before_action :require_login, only: %i[index show]

  before_action :set_case
  # rubocop:disable Rails/LexicallyScopedActionFilter
  before_action :set_query, only: %i[index prev next show new edit]
  # rubocop:enable Rails/LexicallyScopedActionFilter
  before_action :set_day, only: [:index]
  before_action :set_frame, only: %i[create update]
  before_action :back_to_form, only: %i[create update]

  def index
    @pagy, @frames = list_query(word: @word, page: @page)
  end

  def show
    @frame = @case.find_query(frame_id: permitted_params[:id])
  end

  def new
    @frame = Frame.new
  end

  def create
    success, @frame = @case.save_frame(user: current_user, frame: @frame)
    if success
      redirect_to root_path(query_params)
    else
      flashes[:alert] = @frame.full_error_messages unless @frame.errors.empty?
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @frame = @case.find_query_with_user(user: current_user, frame_id: permitted_params[:id])
  end

  def update
    success, @frame = @case.save_frame(user: current_user, frame: @frame)
    if success
      redirect_to frame_path(@frame, query_params)
    else
      flashes[:alert] = @frame.full_error_messages unless @frame.errors.empty?
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @case.delete_frame(user: current_user, frame_id: permitted_params[:id])
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

  def set_case
    @case = FramesCase.new
  end

  def set_frame
    case action_name
    when 'create'
      @frame = Frame.new(form_params)
    when 'update'
      @frame = Frame.find_by!(id: permitted_params[:id], user_id: current_user.id)
      @frame.attributes = form_params
    end
  end

  def back_to_form
    return unless permitted_params[:commit] == '戻る'

    @frame.confirming = ''
    @frame.file_derivatives! if @frame.file.present?
    case action_name
    when 'create'
      render :new
    when 'update'
      render :edit
    end
  end

  def permitted_params
    params.permit(
      :id, :q, :page, :commit, :tag_editor, :_method, :authenticity_token,
      frame: %i[name tag_list comment file shooted_at confirming]
    )
  end

  def form_params
    permitted_params[:frame]
  end
end
