# frozen_string_literal: true

# Frame::Errors module
module Frame::Errors
  extend ActiveSupport::Concern
  include ::Errors::Sortable

  protected

  def error_properties
    %i[file name tag_list creator_name shooted_at]
  end
end
