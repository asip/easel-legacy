# frozen_string_literal: true

# Api::Tags::Variables module
module Api::Tags::Variables
  extend ActiveSupport::Concern

  protected

  def route_params
    @route_params ||= params.permit(:q).to_h
  end

  def name
    route_params[:q]
  end
end
