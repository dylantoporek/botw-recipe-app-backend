class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :price, :description, :ing1, :ing2, :ing3, :ing4, :ing5, :image
  has_one :kitchen
end
