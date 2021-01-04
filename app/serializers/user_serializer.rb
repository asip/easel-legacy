# == Schema Information
#
# Table name: users
#
#  id                         :bigint           not null, primary key
#  token                      :string(255)
#  name                       :string(255)      not null
#  email                      :string(255)      not null
#  crypted_password           :string(255)
#  salt                       :string(255)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  failed_logins_count        :integer          default(0)
#  lock_expires_at            :datetime
#  unlock_token               :string(255)
#  last_login_at              :datetime
#  last_logout_at             :datetime
#  last_activity_at           :datetime
#  last_login_from_ip_address :string(255)
#
class UserSerializer
  include FastJsonapi::ObjectSerializer
  set_type :user
  set_id :id
  attributes :id, :email, :name
end
