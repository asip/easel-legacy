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

  def index
    self.page = route_params[:page]
    @pagy, @frames = list_frames(user: current_user, form:, page:)
  end

  def show
    if current_user
      self.frame = Queries::Frame::FindFrame.run(frame_id:, user: current_user)
    else
      self.frame = Queries::Frame::FindFrame.run(frame_id:, private: false)
    end
  end

  def new
  end

  def create
    save(back_page: ->(frame) { frame_path(frame) })
  end

  def edit
    render_stream
  end

  def update
    save(back_page: ->(frame) { prev_url_for(path: edit_frame_path(frame)) })
  end

  def destroy
    mutation = Mutations::Frame::DeleteFrame.run(user: current_user, frame_id:)
    redirect_to prev_url_for(path: frame_path(mutation.frame)), status: :see_other
  end

  private

  attr_accessor :frame

  def save(back_page:)
    frame.user_id = current_user.id
    mutation = Mutations::Frame::SaveFrame.run(frame:)
    self.frame = mutation.frame
    if mutation.success?
      redirect_to back_page.(frame)
    else
      render_errors(resource: frame)
    end
  end

  def route_params
    @route_params ||= params.permit(
      :id, :page, :commit, :authenticity_token, :_method,
      frame: {}
    ).to_h
  end

  def frame_id
    route_params[:id]
  end

  def commit
    route_params[:commit]
  end

  def form_params
    @form_params ||= params.expect(
      frame: %i[name tag_list comment file creator_name shooted_at private confirming]
    ).to_h
  end

  def q_items
    JsonUtil.to_hash(criteria)
  end

  def form
    @form ||= FrameSearchForm.new(q_items)
  end
end
