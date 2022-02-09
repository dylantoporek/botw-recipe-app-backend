class AddStoreToIngredients < ActiveRecord::Migration[7.0]
  def change
    add_reference :ingredients, :store, null: false, foreign_key: true
  end
end
