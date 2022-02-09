class Pantry < ApplicationRecord
  belongs_to :kitchen
  belongs_to :ingredient
end
