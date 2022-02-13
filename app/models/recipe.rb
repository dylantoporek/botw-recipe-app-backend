class Recipe < ApplicationRecord
  has_many :dishes
  has_many :kitchens, through: :dishes
  # validates :name, presence: true
  # validates :price, presence: true
  # validates :ingredient1, presence: true
  # validates :ingredient2, presence: true
  # validates :ingredient3, presence: true
  # validates :ingredient4, presence: true
  # validates :ingredient5, presence: true
end
