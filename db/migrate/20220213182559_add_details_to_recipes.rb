class AddDetailsToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :details, :text, array: true, default: []
  end
end
