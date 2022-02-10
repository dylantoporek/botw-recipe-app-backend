class Kitchen < ApplicationRecord
  belongs_to :user
  has_many :pantries
  has_many :ingredients, through: :pantries
  has_many :recipes
end
