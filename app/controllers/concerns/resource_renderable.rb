# frozen_string_literal: true

# ResourceRenderable module
module ResourceRenderable
  extend ActiveSupport::Concern

  protected

  def render_stream
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end

  def render_error_stream
    render layout: false, content_type: "text/vnd.turbo-stream.html", status: :unprocessable_content
  end

  def render_errors(resource:, login: false)
    # puts errors.to_hash(true)
    flashes[:alert] = !login ? resource.full_error_messages : resource.full_error_messages_on_login unless resource.errors.empty?
    render_error_stream
  end
end
