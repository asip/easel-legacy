# frozen_string_literal: true

# Frames Controller
class FramesController < ApplicationController
  include Frames::Authentication::Skip
  include Frames::Queries::Pagination
  include PageTransition::Query::List
  include Frames::PageTransition::Ref
  include Frames::PageTransition::Search
  include Frames::Confirmable
  include Frames::Location::Store
  include More
  include Cookie

  def index
    form = FrameSearchForm.new(q_items)
    @pagy, @frames = list_frames(user: current_user, form:, page:)
  end

  def show
    frame_id = permitted_params[:id]
    if current_user
      self.frame = Queries::Frame::FindFrame.run(frame_id:, user: current_user)
    else
      self.frame = Queries::Frame::FindFrame.run(frame_id:, private: false)
    end
  end

  def new
    self.frame = Frame.new(confirming: false)
  end

  def create
    frame.user_id = current_user.id
    mutation = Mutations::Frame::SaveFrame.run(frame: frame)
    self.frame = mutation.frame
    if mutation.success?
      redirect_to frame_path(frame)
    else
      flashes[:alert] = frame.full_error_messages unless frame.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_content
    end
  end

  def edit
    self.frame = Queries::Frame::FindFrame.run(user: current_user, frame_id: permitted_params[:id])
    frame.confirming = false
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end

  def update
    frame.user_id = current_user.id
    mutation = Mutations::Frame::SaveFrame.run(frame: frame)
    self.frame = mutation.frame
    if mutation.success?
      redirect_to prev_url_for(path: edit_frame_path(frame))
    else
      flashes[:alert] = frame.full_error_messages unless frame.errors.empty?
      render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_content
    end
  end

  def destroy
    mutation = Mutations::Frame::DeleteFrame.run(user: current_user, frame_id: permitted_params[:id])
    redirect_to prev_url_for(path: frame_path(mutation.frame)), status: :see_other
  end

  private

  attr_accessor :frame

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
