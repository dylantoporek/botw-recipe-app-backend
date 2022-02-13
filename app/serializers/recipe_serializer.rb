class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :price, :ingredient1, :ingredient2, :ingredient3, :ingredient4, :ingredient5, :details
  
end
