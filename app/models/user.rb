class User < ApplicationRecord
    has_one :kitchen
    has_secure_password
    validates :username, presence: true, uniqueness: true
    # validates :bank, presence: true
end
