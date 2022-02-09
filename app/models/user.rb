class User < ApplicationRecord
    has_one :kitchen
    has_secure_password
end
