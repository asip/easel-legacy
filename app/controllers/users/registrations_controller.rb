# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include Query::Search

  before_action :configure_sign_up_params, only: [ :create ]
  before_action :configure_account_update_params, only: [ :update ]

  before_action :set_user, only: %i[create update]
  before_action :back_to_form, only: %i[create update]

  @@form_params = [ :name, :email, :password, :password_confirmation, :image, :confirming ]

  def set_user
    case action_name
    when "create"
      build_resource(sign_up_params)
    when "update"
      self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    end
  end

  def back_to_form
    return unless params[:commit] == "戻る"

    resource.confirming = ""
    resource.image_derivatives! if resource.image.present?
    case action_name
    when "create"
      render :create, layout: false, content_type: "text/vnd.turbo-stream.html"
    when "update"
      render :update, layout: false, content_type: "text/vnd.turbo-stream.html"
    end
  end

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    resource.save
    yield resource if block_given?
    if resource.confirming.present?
      if resource.active_for_authentication?
        if resource.persisted?
          set_flash_message! :notice, :signed_up
          sign_up(resource_name, resource)
        end
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    @resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource.confirming.present?
      if @resource_updated
        set_flash_message_for_update(resource, prev_unconfirmed_email)
        bypass_sign_in resource, scope: resource_name if sign_in_after_change_password?
      end
      respond_with resource
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  def query_params
    {}
  end

  protected

  def respond_with(resource, _opts = {})
    case action_name
    when "create"
      if resource.persisted?
        redirect_to root_path
      else
        flashes[:alert] = resource.full_error_messages unless resource.errors.empty?
        # puts resource.errors.to_hash(true)
        render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
      end
    when "update"
      if @resource_updated
        redirect_to profile_path
      else
        flashes[:alert] = resource.full_error_messages unless resource.errors.empty?
        # puts resource.errors.to_hash(true)
        render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_entity
      end
    end
  end

  protected

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: @@form_params)
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: @@form_params)
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
