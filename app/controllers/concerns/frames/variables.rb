# frozen_string_literal: true

# Frames::Variables module
module Frames::Variables
  extend ActiveSupport::Concern

  protected

  def route_params
    @route_params ||= params.permit(
      :id, :page, :commit, :authenticity_token, :_method,
      frame: {}
    ).to_h
  end

  def frame_id
    route_params[:id]
  end

  def page_number
    route_params[:page]
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
    @form ||= Frame::SearchForm.new(q_items)
  end
end
