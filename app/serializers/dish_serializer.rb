class DishSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :recipe_id, :kitchen_id
  has_one :kitchen
  has_one :recipe
end
