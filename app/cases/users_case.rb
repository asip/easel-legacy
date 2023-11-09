# frozen_string_literal: true

# Users Case
class UsersCase
  def save_user(user:)
    success = user.save(context: :with_validation)
    [success, user]
  end

  def save_user_with_token(user:)
    success = user.save(context: :with_validation)
    # puts user.saved_change_to_email?
    user.update_token if success
    [success, user]
  end

  def find_query(user_id:)
    User.find_by!(id: user_id)
  end

  def followees_query(user_id:)
    User.find(user_id).followees
  end

  def followers_query(user_id:)
    User.find(user_id).followers
  end
end
