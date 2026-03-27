# frozen_string_literal: true

# ResourceRenderable module
module ResourceRenderable
  extend ActiveSupport::Concern

  protected

  def render_stream
    render layout: false, content_type: "text/vnd.turbo-stream.html"
  end
end
