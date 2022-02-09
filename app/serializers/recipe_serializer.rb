class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :image, :priority
end
