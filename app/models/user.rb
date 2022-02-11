class User < ApplicationRecord
    has_one :kitchen
    has_secure_password
    validates :username, presence: true, uniqueness: true
end
