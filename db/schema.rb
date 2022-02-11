# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_02_11_221344) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ingredients", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "price"
    t.string "image"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "kitchens", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_kitchens_on_user_id"
  end

  create_table "pantries", force: :cascade do |t|
    t.bigint "kitchen_id", null: false
    t.bigint "ingredient_id", null: false
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ingredient_id"], name: "index_pantries_on_ingredient_id"
    t.index ["kitchen_id"], name: "index_pantries_on_kitchen_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.integer "price"
    t.text "description"
    t.string "image"
    t.string "ingredient1"
    t.string "ingredient2"
    t.string "ingredient3"
    t.string "ingredient4"
    t.string "ingredient5"
    t.bigint "kitchen_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["kitchen_id"], name: "index_recipes_on_kitchen_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.integer "bank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "kitchens", "users"
  add_foreign_key "pantries", "ingredients"
  add_foreign_key "pantries", "kitchens"
  add_foreign_key "recipes", "kitchens"
end
