# frozen_string_literal: true

# Api::Tags::Renderable module
module Api::Tags::Renderable
  extend ActiveSupport::Concern

  protected

  def render_tags(tags)
    render_resource TagListResource.new(TagList.new(tags:)).serialize
  end
end
