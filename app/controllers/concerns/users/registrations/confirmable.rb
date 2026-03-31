# frozen_string_literal: true

# Users::Registrations::Confirmable module
module Users::Registrations::Confirmable
  extend ActiveSupport::Concern
  include Users::Registrations::ParameterConfiguration
  include ::Confirmable

  FORM_PARAMS = [ :name, :email, :password, :password_confirmation, :image, :profile, :time_zone, :confirming ]

  protected

  def set_model
    case action_name
    when "new"
      build_resource
      resource.confirming = false
    when "create"
      # puts sign_up_params
      build_resource(sign_up_params)
    when "edit"
      resource.confirming = false
    when "update"
      self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    end
  end

  def back_to_form
    return unless params[:commit] == "戻る"

    resource.confirming = false
    # resource.image_derivatives! if resource.image.present?
    render_stream
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: FORM_PARAMS)
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: FORM_PARAMS)
  end
end
