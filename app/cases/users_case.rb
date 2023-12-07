# frozen_string_literal: true

# Users Case
class UsersCase
  def save_user(user:)
    mutation = Mutations::Users::SaveUser.run(user:)
    [mutation.success?, mutation.user]
  end

  def save_user_with_token(user:)
    mutation = Mutations::Users::SaveUserWithToken.run(user:)
    [mutation.success?, mutation.user]
  end

  def find_query(user_id:)
    Queries::Users::FindUser.run(user_id:)
  end

  def followees_query(user_id:)
    Queries::Users::ListFollowees.run(user_id:)
  end

  def followers_query(user_id:)
    Queries::Users::ListFollowers.run(user_id:)
  end
end
