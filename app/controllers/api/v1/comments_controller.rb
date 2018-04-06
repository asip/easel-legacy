class Api::V1::CommentsController < ApiController
  def index_by_frame_id
    comments = Comment.where(frame_id: params[:id])
    
    #options = {}
    #options[:include] = [:user]

    render json: CommentSerializer.new(comments).serializable_hash  
  end

  def create
    comment = Comment.new(comment_params)
    comment.frame_id = params[:id]
    comment.save
    comment.user = User.find_by(id: comment.user_id)
    render json: CommentSerializer.new(comment).serializable_hash 
  end

  def comment_params
    params.require(:comment).permit(:body, :user_id)
  end
end