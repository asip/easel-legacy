# == Schema Information
#
# Table name: frames
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  name       :string(255)      not null
#  comment    :text(65535)
#  image_id   :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class FrameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :name, :comment
  has_many :comments
  belongs_to :user, record_type: :user 
end
