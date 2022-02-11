class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :price, :description, :image, :ingredient1, :ingredient2, :ingredient3, :ingredient4, :ingredient5
  has_one :kitchen
end
