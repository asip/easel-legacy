# frozen_string_literal: true

# User::Errors module
module User::Errors
  extend ActiveSupport::Concern
  include ::Errors::Sortable
  include ::Login::Errors

  protected

  def error_properties
    %i[image name email current_password password password_confirmation]
  end
end
