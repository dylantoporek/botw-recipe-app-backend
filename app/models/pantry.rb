class Pantry < ApplicationRecord
  belongs_to :kitchen
  belongs_to :ingredient
  validates :quantity, presence: true
end
