# == Schema Information
#
# Table name: users
#
#  id                         :bigint           not null, primary key
#  crypted_password           :string(255)
#  email                      :string(255)      not null
#  failed_logins_count        :integer          default(0)
#  last_activity_at           :datetime
#  last_login_at              :datetime
#  last_login_from_ip_address :string(255)
#  last_logout_at             :datetime
#  lock_expires_at            :datetime
#  name                       :string(255)      not null
#  salt                       :string(255)
#  token                      :string(255)
#  unlock_token               :string(255)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#
# Indexes
#
#  index_users_on_email                                (email) UNIQUE
#  index_users_on_last_logout_at_and_last_activity_at  (last_logout_at,last_activity_at)
#  index_users_on_token                                (token) UNIQUE
#  index_users_on_unlock_token                         (unlock_token)
#
class UserSerializer
  include JSONAPI::Serializer
  set_type :user
  set_id :id
  attributes :id, :email, :name
end
