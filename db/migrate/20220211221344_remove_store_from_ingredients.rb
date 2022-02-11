class RemoveStoreFromIngredients < ActiveRecord::Migration[7.0]
  def change
    remove_reference :ingredients, :store
  end
end
