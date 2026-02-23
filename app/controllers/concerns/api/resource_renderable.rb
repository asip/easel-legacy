# frozen_string_literal: true

# Api::ResourceRenderable module
module Api::ResourceRenderable
  extend ActiveSupport::Concern

  protected

  def render_account(account:)
    render json: AccountResource.new(account).serializable_hash
  end

  def render_comment(comment:)
    # logger.debug CommentResource.new(comment).serialize
    render json: CommentResource.new(comment).serializable_hash
  end

  def render_comments(comments:)
    render json: CommentResource.new(comments).serialize
  end

  def render_errors(reource:)
    render json: Oj.dump({ errors: reource.errors.to_hash(false) }), status: :unprocessable_content
  end
end
