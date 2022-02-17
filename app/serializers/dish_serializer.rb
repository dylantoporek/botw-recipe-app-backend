class DishSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  has_one :kitchen
  has_one :recipe
end
