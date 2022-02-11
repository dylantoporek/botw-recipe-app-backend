class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :type
      t.integer :price
      t.text :description
      t.string :ing1
      t.string :ing2
      t.string :ing3
      t.string :ing4
      t.string :ing5
      t.string :image
      t.belongs_to :kitchen, null: false, foreign_key: true

      t.timestamps
    end
  end
end
