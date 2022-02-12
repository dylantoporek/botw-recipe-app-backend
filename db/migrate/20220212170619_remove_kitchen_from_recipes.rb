class RemoveKitchenFromRecipes < ActiveRecord::Migration[7.0]
  def change
    remove_reference :recipes, :kitchen
  end
end
