class Api::V1::FramesController < ApiController
  skip_before_action :authenticate, only: [:index]
  before_action :set_query, only: [:index]

  def index
    frames = Frame.where(nil).eager_load(:comments)

    if @word.present?
      frames = frames.joins(:tags, :user)
        .merge(ActsAsTaggableOn::Tag.where("tags.name like ?", "%#{@word}%"))
        .or(Frame.where("frames.name like ?", "%#{@word}%"))
        .or(User.where(name: @word))
    end

    frames = frames.page(@page)
    render json: FrameSerializer.new(frames, index_options).serializable_hash
  end

  private

  def index_options
    {include: [:comments]}
  end

  def set_query
    @word = permitted_params[:q]
    @page = permitted_params[:page]
  end

  def permitted_params
    params.permit(
      :id,
      :q,
      :page,
      frame: [
        :name,
        :tag_list,
        :comment,
        :image,
        :confirming
      ]
    )
  end
end
