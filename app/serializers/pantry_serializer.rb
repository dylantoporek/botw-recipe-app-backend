class PantrySerializer < ActiveModel::Serializer
  attributes :id, :quantity, :kitchen_id, :ingredient_id
  has_one :kitchen
  has_one :ingredient
end
