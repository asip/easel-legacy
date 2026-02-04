# frozen_string_literal: true

# Queries::User::ListFollowers class
class Queries::User::ListFollowers
  include Query

  def initialize(user_id:)
    @user_id = user_id
  end

  def execute
    user = Queries::User::FindUser.run(user_id: @user_id)
    user.followers
  end
end
