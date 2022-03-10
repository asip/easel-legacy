# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  frame_id   :integer          not null
#  body       :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CommentSerializer
  include JSONAPI::Serializer
  set_type :comment
  set_id :id
  attributes :user_id, :frame_id, :body

  attribute :user_name do |object|
    object.user.name
  end

  attribute :user_image_url do |object|
    object.user.image_url(:thumbnail)
  end

  attribute :updated_at do |object|
    object.updated_at.strftime("%Y/%m/%d %H:%M:%S")
  end

  attribute :error_messages do |object|
    object.errors.full_messages
  end
end
