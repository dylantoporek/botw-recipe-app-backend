class Ingredient < ApplicationRecord
    has_many :pantries
    has_many :kitchens, through: :pantries
    # validates :name, presence: true, uniqueness: true
    # validates :price, presence: true

end
