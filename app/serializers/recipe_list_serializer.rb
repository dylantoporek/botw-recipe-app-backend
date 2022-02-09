class RecipeListSerializer < ActiveModel::Serializer
  attributes :id, :item_1, :item_2, :item_3, :item_4, :item_5
  has_one :ingredient
  has_one :recipe
end
