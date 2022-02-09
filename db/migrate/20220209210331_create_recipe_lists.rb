class CreateRecipeLists < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_lists do |t|
      t.belongs_to :ingredient, null: false, foreign_key: true
      t.belongs_to :recipe, null: false, foreign_key: true
      t.string :item_1
      t.string :item_2
      t.string :item_3
      t.string :item_4
      t.string :item_5

      t.timestamps
    end
  end
end
