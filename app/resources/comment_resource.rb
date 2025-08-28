# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  frame_id   :bigint           not null
#  user_id    :bigint           not null
#

# Comment Resource
class CommentResource < BaseResource
  root_key :comment, :comments
  attributes :id, :user_id, :frame_id, :body

  attribute :user_name do |comment|
    comment.user.name
  end

  attribute :user_image_url do |comment|
    comment.user.image_url_for_view(:thumb)
  end

  attribute :created_at do |comment|
    I18n.l(comment.created_at)
  end

  attribute :updated_at do |comment|
    I18n.l(comment.updated_at)
  end
end
