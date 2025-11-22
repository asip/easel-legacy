# frozen_string_literal: true

# Frames Controller
class FramesController < ApplicationController
  include Queries::Frames::Pagination
  include Query::Search
  include Query::List
  include Ref::FrameRef
  include Query::FrameQuery
  include More
  include Session

  skip_before_action :authenticate_user!, only: %i[index show]

  before_action :set_prev_url, only: %i[show new]
  before_action :set_frame, only: %i[create update]
  before_action :back_to_form, only: %i[create update]

  def index
    form = FrameSearchForm.new(q_items)
    @pagy, @frames = list_frames(items: form.to_h, page: page_str)
  end

  def show
    frame_id = permitted_params[:id]
    if current_user
      self.frame = Queries::Frames::FindFrame.run(frame_id:, user: current_user)
    else
      self.frame = Queries::Frames::FindFrame.run(frame_id:, private: false)
    end
  end

  def new
    self.frame = Frame.new(confirming: false)
  end

  def create
    mutation = Mutations::Frames::SaveFrame.run(user: current_user, frame: frame)
    self.frame = mutation.frame
    if mutation.success?
      redirect_to root_path # (query_map)
    else
      flashes[:alert] = frame.full_error_messages unless frame.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
    end
  end

  def edit
    self.frame = Queries::Frames::FindFrame.run(user: current_user, frame_id: permitted_params[:id])
    self.frame.confirming = false
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end

  def update
    mutation = Mutations::Frames::SaveFrame.run(user: current_user, frame: frame)
    self.frame = mutation.frame
    if mutation.success?
      redirect_to frame_path(frame, query_map)
    else
      flashes[:alert] = frame.full_error_messages unless frame.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
    end
  end

  def destroy
    Mutations::Frames::DeleteFrame.run(user: current_user, frame_id: permitted_params[:id])
    redirect_to root_path(query_map), status: :see_other
  end

  private

  attr_accessor :frame

  def set_prev_url
    from = request.referer
    if (action_name == "show" && !from&.include?("/frames")) ||
       (action_name == "new" && !from&.include?("/profile") &&
        !from&.include?("/account/password/edit") && !from&.include?("/frames/new"))
      session[:prev_url] = from || root_path(query_map)
    end
  end

  def set_frame
    case action_name
    when "create"
      self.frame = Frame.new(form_params)
    when "update"
      self.frame = Frame.find_by!(id: permitted_params[:id], user_id: current_user.id)
      self.frame.attributes = form_params
    end
  end

  def back_to_form
    return unless permitted_params[:commit] == "戻る"

    self.frame.confirming = false
    # self.frame.file_derivatives! if frame.file.present?
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end

  def permitted_params
    @permitted_params ||= params.permit(
      :id, :q, :page, :ref, :commit, :authenticity_token, :_method,
      frame: {}
    ).to_h
  end

  def form_params
    @form_params ||= params.expect(
      frame: %i[name tag_list comment file creator_name shooted_at private confirming]
    )
  end
end
