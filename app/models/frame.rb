# == Schema Information
#
# Table name: frames
#
#  id         :bigint           not null, primary key
#  comment    :text(65535)
#  image_data :text(65535)
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class Frame < ApplicationRecord
  include Screen::Confirmable
  # has_one_attached :image
  include Frame::ImageUploader::Attachment(:image)

  acts_as_taggable_on :tags

  has_many :comments
  belongs_to :user

  paginates_per 8

  validates :name, length: {in: 1..20}
  validates :image, presence: true
  validate :check_tag

  scope :search_by, ->(word:) do
    scope = current_scope || relation

    if word.present?
      scope = scope.joins(:tags, :user)
        .merge(ActsAsTaggableOn::Tag.where("tags.name like ?", "%#{word}%"))
        .or(Frame.where("frames.name like ?", "%#{word}%"))
        .or(User.where(name: word))
    end

    scope
  end

  def tags_preview
    tag_list.to_s.split(/\s*,\s*/)
  end

  private

  def check_tag
    if tags_preview.size > 5
      errors[:tag_list] << "は５つまでしかセットできません"
    end
    tags_preview.each do |tag|
      # puts tag.to_s
      if tag.to_s.size > 10
        errors[:tag_list] << "は10文字以内で入力してください"
        break
      end
    end
  end
end
