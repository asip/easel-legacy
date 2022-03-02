class Api::V1::CommentsController < Backend::ApiController
  skip_before_action :authenticate, only: [:index]

  def index
    comments = Comment.where(frame_id: params[:frame_id])

    # options = {}
    # options[:include] = [:user]

    render json: CommentSerializer.new(comments).serializable_hash
  end

  def create
    comment = Comment.new(comment_params)
    comment.frame_id = params[:frame_id]
    comment.user_id = current_user.id
    if logged_in? && comment.valid?
      comment.save
    end

    # logger.debug CommentSerializer.new(comment).serialized_json

    render json: CommentSerializer.new(comment).serializable_hash
  end

  def destroy
    comment = Comment.find_by(id: id_params[:id])
    if comment && logged_in? && current_user.id == comment.user_id
      comment.destroy
    end
    head :no_content
  end

  private

  def id_params
    params.permit(:id)
  end

  def comment_params
    params.require(:comment).permit(:body, :frame_id)
  end
end
