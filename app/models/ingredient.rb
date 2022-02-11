class Ingredient < ApplicationRecord
    belongs_to :store
    has_many :pantries
    has_many :kitchens, through: :pantries
    validates :name, presence: true, uniqueness: true
    validates :price, presence: true
    validates :category, presence: true

end
