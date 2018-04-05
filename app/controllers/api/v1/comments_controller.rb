class Api::V1::CommentsController < ApiController
  def index_by_frame_id
    @comments = Comment.where(frame_id: params[:id])
    
    #options = {}
    #options[:include] = [:user]

    render json: CommentSerializer.new(@comments).serializable_hash  
  end

  def create
  end

  def comment_parans
    params.require(:comment).permit(:body)
  end
end