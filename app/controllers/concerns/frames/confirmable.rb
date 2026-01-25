# frozen_string_literal: true

# Frames::Confirmable module
module Frames::Confirmable
  extend ActiveSupport::Concern

  included do
    before_action :set_model, only: %i[create update]
    before_action :back_to_form, only: %i[create update]
  end

  protected

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
end
