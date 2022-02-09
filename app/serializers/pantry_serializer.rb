class PantrySerializer < ActiveModel::Serializer
  attributes :id, :quantity
  has_one :kitchen
  has_one :ingredient
end
