class AddListToRecipe < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :list, :string, array: true, default: []
  end
end
