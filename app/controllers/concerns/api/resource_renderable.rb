# frozen_string_literal: true

# Api::ResourceRenderable module
module Api::ResourceRenderable
  extend ActiveSupport::Concern

  protected

  def render_account(account:)
    render_resource AccountResource.new(account).serialize
  end

  def render_comment(comment:)
    render_resource CommentResource.new(comment).serialize
  end

  def render_comments(comments:)
    render_resource CommentResource.new(comments).serialize(root_key: :comments)
  end

  def render_tags(tags:)
    render_resource(TagListResource.new(TagList.new(tags:)).serialize)
  end
end
