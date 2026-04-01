# frozen_string_literal: true

# Frames::Confirmable module
module Frames::Confirmable
  extend ActiveSupport::Concern
  include ::Confirmable

  protected

  def set_model
    case action_name
    when "new"
      self.frame = Frame.new(confirming: false)
    when "create"
      self.frame = Frame.new(form_params)
    when "edit"
      self.frame = Queries::Frame::FindFrame.run(user: current_user, frame_id:)
      frame.confirming = false
    when "update"
      self.frame = Frame.find_by!(id: frame_id, user_id: current_user.id)
      frame.attributes = form_params
    end
  end

  def back_to_form
    return unless commit == "戻る"

    self.frame.confirming = false
    # frame.file_derivatives! if frame.file.present?
    render_stream
  end
end
