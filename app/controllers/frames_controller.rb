# frozen_string_literal: true

# Frames Controller
class FramesController < ApplicationController
  include Queries::Frames::Pagination
  include Query::Search
  include Query::List
  include Ref::FrameRef
  include More

  skip_before_action :authenticate_user!, only: %i[index show]

  # rubocop:disable Rails/LexicallyScopedActionFilter
  before_action :set_query_items, only: %i[index prev next show new edit]
  # rubocop:enable Rails/LexicallyScopedActionFilter
  before_action :set_day, only: [ :index ]
  before_action :set_frame, only: %i[create update]
  before_action :back_to_form, only: %i[create update]

  def index
    @pagy, @frames = list_frames(items: @items, page: @page)
  end

  def show
    @q_str = q_string
    @frame = Queries::Frames::FindFrame.run(frame_id: permitted_params[:id], private: false)
  end

  def new
    session[:prev_url] = request.referer || root_path(query_map)
    @prev_url = session[:prev_url]
    @frame = Frame.new
  end

  def create
    mutation = Mutations::Frames::SaveFrame.run(user: current_user, frame: @frame, form_params:)
    @frame = mutation.frame
    if mutation.success?
      redirect_to root_path # (query_map)
    else
      @prev_url = session[:prev_url]
      flashes[:alert] = @frame.full_error_messages unless @frame.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
    end
  end

  def edit
    @frame = Queries::Frames::FindFrame.run(user: current_user, frame_id: permitted_params[:id])
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end

  def update
    mutation = Mutations::Frames::SaveFrame.run(user: current_user, frame: @frame, form_params:)
    @frame = mutation.frame
    if mutation.success?
      redirect_to frame_path(@frame, query_map)
    else
      flashes[:alert] = @frame.full_error_messages unless @frame.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
    end
  end

  def destroy
    Mutations::Frames::DeleteFrame.run(user: current_user, frame_id: permitted_params[:id])
    redirect_to root_path(query_map), status: :see_other
  end

  private

  def set_query_items
    @items = q_items
    @page = permitted_params[:page]
  end

  def set_day
    word = @items["word"]
    @day = if word.blank? || !DateAndTime::Util.valid_date?(word)
      ""
    else
      word
    end
  end

  def set_frame
    case action_name
    when "create"
      @frame = Frame.new(form_params)
    when "update"
      @frame = Frame.find_by!(id: permitted_params[:id], user_id: current_user.id)
      @frame.attributes = form_params
    end
  end

  def back_to_form
    return unless permitted_params[:commit] == "戻る"

    @frame.confirming = ""
    @frame.joined_tags = form_params[:tag_list]
    # @frame.file_derivatives! if @frame.file.present?
    case action_name
    when "create"
      render :create, layout: false, content_type: "text/vnd.turbo-stream.html"
    when "update"
      render :update, layout: false, content_type: "text/vnd.turbo-stream.html"
    end
  end

  def query_map_with_ref
    q_items = permitted_params[:q]
    items = { ref: ref_items.to_json }
    items[:q] = q_items if q_items.present?
    items
  end

  def ref_items
    ref_items_ = permitted_params[:ref]
    if ref_items_.present?
      JSON.parse(ref_items_)
    else
      items = { from: "frame", id: @frame.id }
      items[:page] = @page if @page.present?
      items
    end
  end

  def permitted_params
    params.permit(
      :id, :q, :page, :ref, :commit, :tag_editor, :_method, :authenticity_token,
      frame: %i[name tag_list comment file creator_name shooted_at confirming]
    )
  end

  def form_params
    permitted_params[:frame]
  end
end
