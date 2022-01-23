# == Schema Information
#
# Table name: frames
#
#  id         :bigint           not null, primary key
#  user_id    :integer
#  name       :string(255)      not null
#  comment    :text(65535)
#  image_id   :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Frame < ApplicationRecord
  # has_one_attached :image
  include ImageUploader::Attachment(:image)
  acts_as_taggable_on :tags

  has_many :comments
  belongs_to :user

  paginates_per 8

  validates_acceptance_of :confirming

  validates :name, length: {in: 1..20}
  validates :image, presence: true
  validate :check_tag

  after_validation :check_confirming

  def tags_preview
    tag_list.to_s.split(/\s*,\s*/)
  end

  private

  def check_confirming
    errors.delete(:confirming)
    self.confirming = errors.empty? ? "true" : ""
  end

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
