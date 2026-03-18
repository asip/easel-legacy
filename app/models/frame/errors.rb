# frozen_string_literal: true

# Frame::Errors module
module Frame::Errors
  extend ActiveSupport::Concern

  protected

  def error_properties
    %i[file name tag_list]
  end
end
