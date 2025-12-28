# frozen_string_literal: true

# Frames Controller
class FramesController < ApplicationController
  include Queries::Frames::Pagination
  include PageTransition::Query::List
  include PageTransition::Frame::Ref
  include PageTransition::Frame::Search
  include More
  include Cookie

  skip_before_action :authenticate_user!, only: %i[index show]

  before_action :store_location, only: %i[show new edit]
  before_action :set_model, only: %i[create update]
  before_action :back_to_form, only: %i[create update]

  def index
    form = FrameSearchForm.new(q_items)
    @pagy, @frames = list_frames(user: current_user, items: form.to_h, page:)
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
    frame.user_id = current_user.id
    mutation = Mutations::Frames::SaveFrame.run(frame: frame)
    self.frame = mutation.frame
    if mutation.success?
      redirect_to frame_path(frame)
    else
      flashes[:alert] = frame.full_error_messages unless frame.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
    end
  end

  def edit
    self.frame = Queries::Frames::FindFrame.run(user: current_user, frame_id: permitted_params[:id])
    frame.confirming = false
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end

  def update
    frame.user_id = current_user.id
    mutation = Mutations::Frames::SaveFrame.run(frame: frame)
    self.frame = mutation.frame
    if mutation.success?
      redirect_to prev_url_for(path: edit_frame_path(frame))
    else
      flashes[:alert] = frame.full_error_messages unless frame.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
    end
  end

  def destroy
    mutation = Mutations::Frames::DeleteFrame.run(user: current_user, frame_id: permitted_params[:id])
    redirect_to prev_url_for(path: frame_path(mutation.frame)), status: :see_other
  end

  private

  attr_accessor :frame

  def store_location
    from = request.referer
    if (action_name == "show" && !from&.include?("/frames") && PageTransition::Path.not_before_login_unsaved_paths?(from)) ||
       ((action_name == "new" || (action_name == "edit" && !from.include?(request.path))) &&
        PageTransition::Path.not_after_login_unsaved_paths?(from))
      self.prev_url = from || root_path(query_map_for_search)
    end
  end

  def set_model
    case action_name
    when "create"
      self.frame = Frame.new(form_params)
    when "update"
      self.frame = Frame.find_by!(id: permitted_params[:id], user_id: current_user.id)
      frame.attributes = form_params
    end
  end

  def back_to_form
    return unless permitted_params[:commit] == "戻る"

    self.frame.confirming = false
    # frame.file_derivatives! if frame.file.present?
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end

  def permitted_params
    @permitted_params ||= params.permit(
      :id, :page, :ref, :commit, :authenticity_token, :_method,
      frame: {}
    ).to_h
  end

  def form_params
    @form_params ||= params.expect(
      frame: %i[name tag_list comment file creator_name shooted_at private confirming]
    ).to_h
  end
end
