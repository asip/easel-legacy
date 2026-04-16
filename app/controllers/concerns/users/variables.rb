# frozen_string_literal: true

# Users::Variables module
module Users::Variables
  extend ActiveSupport::Concern

  protected

  def route_params
    @route_params ||= params.permit(:id, :user_id, :page).to_h
  end

  def user_id
    route_params[:id]
  end

  def page_number
    route_params[:page]
  end
end
