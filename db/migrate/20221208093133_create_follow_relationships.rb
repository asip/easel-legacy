# frozen_string_literal: true

# create follow_relationships
class CreateFollowRelationships < ActiveRecord::Migration[7.0]
  def change
    create_table :follow_relationships do |t|
      t.integer :follower_id
      t.integer :followee_id
      t.timestamps
    end
  end
end
