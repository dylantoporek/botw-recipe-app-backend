class CreatePantries < ActiveRecord::Migration[7.0]
  def change
    create_table :pantries do |t|
      t.belongs_to :kitchen, null: false, foreign_key: true
      t.belongs_to :ingredient, null: false, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
