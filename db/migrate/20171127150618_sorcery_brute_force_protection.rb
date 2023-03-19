# frozen_string_literal: true

# sorcery brute force protection
class SorceryBruteForceProtection < ActiveRecord::Migration[5.1]
  # rubocop:disable Rails/BulkChangeTable
  def change
    add_column :users, :failed_logins_count, :integer, default: 0
    add_column :users, :lock_expires_at, :datetime, default: nil
    add_column :users, :unlock_token, :string, default: nil

    add_index :users, :unlock_token
  end
  # rubocop:enable Rails/BulkChangeTable
end
