class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :category
      t.integer :price
      t.text :description
      t.string :image
      t.string :ingredient1
      t.string :ingredient2
      t.string :ingredient3
      t.string :ingredient4
      t.string :ingredient5
      t.belongs_to :kitchen, null: false, foreign_key: true

      t.timestamps
    end
  end
end
