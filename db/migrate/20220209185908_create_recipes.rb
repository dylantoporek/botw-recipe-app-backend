class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :description
      t.integer :price
      t.string :image
      t.integer :priority

      t.timestamps
    end
  end
end
