class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :image, :category
end
