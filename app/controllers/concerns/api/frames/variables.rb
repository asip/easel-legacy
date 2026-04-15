# frozen_string_literal: true

# Api::Frames::Variables module
module Api::Frames::Variables
  extend ActiveSupport::Concern

  protected

  def route_params
    @route_params ||= params.permit(:frame_id).to_h
  end

  def frame_id
    route_params[:frame_id]
  end
end
