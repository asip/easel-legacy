# frozen_string_literal: true

# Queries::User::ListFollowees class
class Queries::User::ListFollowees
  include Query

  def initialize(user_id:)
    @user_id = user_id
  end

  def execute
    user = Queries::User::FindUser.run(user_id: @user_id)
    user.followees
  end
end
