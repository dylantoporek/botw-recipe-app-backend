class Ingredient < ApplicationRecord
    belongs_to :store
    has_many :pantries
    has_many :kitchens, through: :pantries

end
