class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.text :description
      t.integer :price
      t.string :image
      t.string :category

      t.timestamps
    end
  end
end
