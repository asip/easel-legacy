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
  include FastJsonapi::ObjectSerializer
  set_type :comment
  set_id :id
  attributes :user_id, :frame_id, :body
  belongs_to :user, record_type: :user
  #belongs_to :frame, record_type: :frame

  attribute :user_name do |object|
    object.user.name
  end

  attribute :updated_at do |object|
    object.updated_at.strftime('%Y/%m/%d %H:%M:%S')
  end

  attribute :error_messages do |object|
    object.errors.full_messages
  end
end
