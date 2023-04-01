# frozen_string_literal: true

# == Schema Information
#
# Table name: follow_relationships
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  followee_id :integer
#  follower_id :integer
#
require 'rails_helper'

RSpec.describe FollowRelationship, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
