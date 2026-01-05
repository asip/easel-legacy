# frozen_string_literal: true

# Frontend module
module Frontend
  extend ActiveSupport::Concern

  included do
    layout "frontend"
  end

  def default_render(*args)
    respond_to do |format|
      format.html {
        render(inline: "", layout: "frontend")
      }
    end
  end
end
