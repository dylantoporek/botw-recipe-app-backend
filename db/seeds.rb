require 'pry'
puts "Seeding Data"

response = HTTParty.get('https://zelda.fandom.com/wiki/Food#Breath_of_the_Wild')
meals = Nokogiri::HTML(response)
tables3 = meals.css('table')

response2 = HTTParty.get('https://zelda.fandom.com/wiki/Material/Breath_of_the_Wild')
html2 = Nokogiri::HTML(response2)
tables2 = html2.css('table')


response3 = HTTParty.get('https://zelda.fandom.com/wiki/Food#List_of_Food')
html = Nokogiri::HTML(response3)
tables = html.css('table')

recipes_info = tables[3].css('tr')


all_recipes_info = recipes_info.map do |row|
    cell_array = row.css('td')
    # binding.pry
    if cell_array.empty? 
        nil
    else 
        {
            name: cell_array[0] ? cell_array[0].inner_text : nil,
            image: cell_array[0].children.children[0].attributes['data-src'] ? cell_array[0].children.children[0].attributes['data-src'].value : nil,
            description: cell_array[1] ? cell_array[1].inner_text : nil
        }
    end
end.compact.filter{|item| item.has_key?(:name)}

description_list = all_recipes_info.map do |item|
    {
        name: item[:name],
        image: item[:image],
        description: item[:description]
    }
end

materials = tables2[0].css('tr')

all_materials = materials.map do |row|
    cell_array = row.css('td')
    if cell_array.empty? 
        nil
    else
        {
            name: cell_array[0] ? cell_array[0].inner_text : nil,
            description: cell_array[1] ? cell_array[1].inner_text : nil,
            price: cell_array[2] ? cell_array[2].inner_text : nil,
            additional_info: cell_array[3] ? cell_array[3].inner_text : nil,
            image: cell_array[0].children.children[0].attributes['href'] ? cell_array[0].children.children[0].attributes['href'].value : nil

        }
    end
end.compact.filter{|mat| mat.has_key?(:additional_info)}

filtered_materials = all_materials.filter do |ing_hash|
   if ing_hash[:additional_info]
    ing_hash[:additional_info].match?(/cook|Restores|hearts/) && !ing_hash[:additional_info].match?(/elixir/)
   else
    nil
   end
end

ingredients = filtered_materials.map do |mat|
    if mat[:name].match?(/Apple|Lotus|Durian|Hydromelon|Banana|Fruit|Pepper|Voltfruit|Wildberry/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Fruit"
        }
    elsif mat[:name].match?(/Truffle|Chillshroom|Shroom|Ironshroom|Razorshroom|Rushroom|Sunshroom|Zapshroom/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Mushroom"
        }
    elsif mat[:name].match?(/Radish|Carrot|Pumpkin/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Vegetable"
        }
    elsif mat[:name].match?(/Meat/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Red Meat"
        }
    elsif mat[:name].match?(/Bird/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Poultry"
        }
    elsif mat[:name].match?(/Crab/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Crab"
        }
    elsif mat[:name].match?(/Carp|Porgy|Trout|Bass|Salmon/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Fish"
        }
    elsif mat[:name].match?(/Snail/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Snail"
        }
    elsif mat[:name].match?(/Acorn|Egg|Chickaloo|Honey|Butter|Rice|Spice|Wheat|Milk|Sugar|Rock|Salt/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Misc"
        }
    elsif mat[:name].match?(/Armoranth|Nightshade|Safflina|Herb|Thistle|Princess|Violet/)
        {
            name: mat[:name].chomp,
            price: mat[:price].chomp.to_i,
            description: mat[:description].chomp,
            image: mat[:image].chomp,
            category: "Herb"
        }
    end
end


    # recipes_list = tables3[2].css('tr').map do |item|
    #     print item
    #     binding.pry
 
    #     # specific_info = description_list.find do |info|
    #     #     name_for_search = info[:name].chomp
    #     #     item['name'].match?(name_for_search)
    #     # end

        
        
    #     # binding.pry
    #     {
    #         name: item.inner_text.chomp,
    #         # category: item['type'],
    #         # price: item['resale'],
    #         # ingredient1: item['ingredient1'],
    #         # ingredient2: item['ingredient2'],
    #         # ingredient3: item['ingredient3'],
    #         # ingredient4: item['ingredient4'],
    #         # ingredient5: item['ingredient5'],
    #         # description: specific_info ? specific_info[:description].chomp : nil,
    #         image: item.children[0].children[0].attributes['data-src'].value.split("/revision")[0]
            
    #     }

    # end

    recipes_list = [
        {
            name: 'Apple Pie',
            category: 'Dessert',
            price: 40,
            ingredient1: 'Apple',
            ingredient2: 'Tabantha Wheat',
            ingredient3: 'Cane Sugar',
            ingredient4: 'Goat Butter',
            description: 'The crispy, flaky pie crust and sweet apples are a match made in heaven',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/e/e7/BotW_Apple_Pie_Icon.png'
        },
        {
            name: 'Carrot Cake',
            category: 'Dessert',
            price: 40,
            ingredient1: 'Endura Carrot',
            ingredient2: 'Tabantha Wheat',
            ingredient3: 'Cane Sugar',
            ingredient4: 'Goat Butter',
            description: "Even those who don't like carrots tend to enjoy the mild sweetness of this cake.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/8/81/BotW_Carrot_Cake_Icon.png'
        },
        {
            name: 'Carrot Stew',
            category: 'Vegetarian Soup',
            price: 40,
            ingredient1: 'Swift Carrot',
            ingredient2: 'Tabantha Wheat',
            ingredient3: 'Fresh Milk',
            ingredient4: 'Goat Butter',
            description: "This simple stew sat simmering for a long time to bring out the sweetness of the carrots.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/e/e5/BotW_Carrot_Stew_Icon.png'
        },
        {
            name: 'Clam Chowder',
            category: 'Seafood Soup',
            price: 60,
            ingredient1: 'Hearty Blueshell Snail',
            ingredient2: 'Goat Butter',
            ingredient3: 'Tabantha Wheat',
            ingredient4: 'Fresh Milk',
            description: 'The nutritional value of hearty blueshell snail combines with butter and milk in a rich soup.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/3b/BotW_Clam_Chowder_Icon.png'
        },
        {
            name: 'Crab Omelet with Rice',
            category: 'Seafood Breakfast',
            price: 50,
            ingredient1: 'Bird Egg',
            ingredient2: 'Hylian Rice',
            ingredient3: 'Rock Salt',
            ingredient4: 'Ironshell Crab',
            description: "The fluffy crab legs pair perfectly with the rice for a truly scrumptious dish.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/6/6d/BotW_Crab_Omelet_with_Rice_Icon.png'
        },
        {
            name: 'Crab Risotto',
            category: 'Seafood Meal',
            price: 60,
            ingredient1: 'Goat Butter',
            ingredient2: 'Hylian Rice',
            ingredient3: 'Rock Salt',
            ingredient4: 'Razorclaw Crab',
            description: "An everyday staple of seaside villages, the secret to its delicious flavor lies in crab fat.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/f/f3/BotW_Crab_Risotto_Icon.png'
        },
        {
            name: 'Crab Stir Fry',
            category: 'Seafood Meal',
            price: 40,
            ingredient1: 'Bright-Eyed Crab',
            ingredient2: 'Goron Spice',
            description: "The Goron spice used in preparing this crab pairs perfectly with the flavor of the meat.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/be/BotW_Crab_Stir-Fry_Icon.png'
        },
        {
            name: 'Cream of Mushroom Soup',
            category: 'Vegetarian Soup',
            price: 80,
            ingredient1: 'Ironshroom',
            ingredient2: 'Big Hearty Radish',
            ingredient3: 'Fresh Milk',
            ingredient4: 'Rock Salt',
            description: "The creamy mushroom and vegetable soup is so chunky it eats like a meal!",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/0/0c/BotW_Cream_of_Mushroom_Soup_Icon.png'
        },
        {
            name: 'Creamy Heart Soup',
            category: 'Vegetarian Soup',
            price: 50,
            ingredient1: 'Hydromelon',
            ingredient2: 'Fresh Milk',
            ingredient3: 'Hearty Radish',
            ingredient4: 'Voltfruit',
            description: "Enjoying this sweet soup with another person will bring you both closer together.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/21/BotW_Creamy_Heart_Soup_Icon.png'
        },
        {
            name: 'Curry Pilaf',
            category: 'Curry Meal',
            price: 45,
            ingredient1: 'Hylian Rice',
            ingredient2: 'Bird Egg',
            ingredient3: 'Goat Butter',
            ingredient4: 'Goron Spice',
            description: "The Goron spice used in this pilaf has given it a rich, spicy aroma.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c3/BotW_Curry_Pilaf_Icon.png'
        },
        {
            name: 'Curry Rice',
            category: 'Curry Meal',
            price: 15,
            ingredient1: 'Hylian Rice',
            ingredient2: 'Goron Spice',
            description: "A favorite all over Hyrule, this simple dish has a flavor you just won't get tired of.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/d/d0/BotW_Curry_Rice_Icon.png'
        },
        {
            name: 'Egg Pudding',
            category: 'Dessert',
            price: 25,
            ingredient1: 'Fresh Milk',
            ingredient2: 'Bird Egg',
            ingredient3: 'Cane Sugar',
            description: "Made by cooking eggs and milk in a special mold, its soft texture melts in your mouth.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/22/BotW_Egg_Pudding_Icon.png'
        },
        {
            name: 'Egg Tart',
            category: 'Dessert',
            price: 25,
            ingredient1: 'Goat Butter',
            ingredient2: 'Bird Egg',
            ingredient3: 'Cane Sugar',
            ingredient4: 'Tabantha Wheat',
            description: "You'll know this simple dessert is done baking when it smells just delightful.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/1/1c/BotW_Egg_Tart_Icon.png'
        },
        {
            name: 'Energizing Honey Candy',
            category: 'Dessert',
            price: 10,
            ingredient1: 'Courser Bee Honey',
            description: "A natural sweet, brimming with nutrition and made by stewing fresh honey.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/20/BotW_Honey_Candy_Icon.png'
        },
        {
            name: 'Fish Pie',
            category: 'Seafood Pie',
            price: 55,
            ingredient1: 'Hyrule Bass',
            ingredient2: 'Goat Butter',
            ingredient3: 'Rock Salt',
            ingredient4: 'Tabantha Wheat',
            description: "A mainstay in any fisherman's home, the crisp crust pairs well with the fishy flavor.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/e/ed/BotW_Fish_Pie_Icon.png'
        },
        {
            name: 'Fragrant Mushroom Sauté',
            category: 'Vegetarian Meal',
            price: 30,
            ingredient1: 'Endura Shroom',
            ingredient2: 'Goron Spice',
            description: "The fragrant aroma of this sautéed spice and mushroom dish makes your mouth water.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c7/BotW_Fragrant_Mushroom_Saut%C3%A9_Icon.png'
        },
        {
            name: 'Fish Skewer',
            category: 'Seafood Meal',
            price: 15,
            ingredient1: 'Hearty Bass',
            description: 'A simple dish made by cooking chunks of fresh fish on a skewer.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/5/59/BotW_Fish_Skewer_Icon.png'
        },
        {
            name: 'Fish and Mushroom Skewer',
            category: 'Seafood Meal',
            price: 25,
            ingredient1: 'Sanke Carp',
            ingredient2: 'Rushroom',
            description: 'A simple dish made by cooking skewered, fresh fish alongside fragrant mushrooms.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/2d/BotW_Fish_and_Mushroom_Skewer_Icon.png'
        },
        {
            name: 'Fried Bananas',
            category: 'Vegetarian Dessert',
            price: 30,
            ingredient1: 'Mighty Bananas',
            ingredient2: 'Tabantha Wheat',
            ingredient3: 'Cane Sugar',
            description: 'Children love fried mighty bananas. The trick is frying them over very high heat.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/f/fb/BotW_Fried_Bananas_Icon.png'
        },
        {
            name: 'Fried Egg and Rice',
            category: 'Meal',
            price: 20,
            ingredient1: 'Bird Egg',
            ingredient2: 'Hylian Rice',
            description: 'The soft egg yolk pairs well with the fresh rice in this simple dish.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/0/0a/BotW_Fried_Egg_and_Rice_Icon.png'
        },
        {
            name: 'Fruit and Mushroom Mix',
            category: 'Vegetarian Fruit Meal',
            price: 15,
            ingredient1: 'Hearty Durian',
            ingredient2: 'Sunshroom',
            description: 'This dish contrasts the sweetness of fruit with the savoriness of mushrooms.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/7/7b/BotW_Fruit_and_Mushroom_Mix_Icon.png'
        },
        {
            name: 'Glazed Meat',
            category: 'Meat Meal',
            price: 20,
            ingredient1: 'Courser Bee Honey',
            ingredient2: 'Raw Meat',
            description: 'The sweetness of the honey permeates the meat, giving it a complex taste profile.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/b3/BotW_Glazed_Meat_Icon.png'
        },
        {
            name: 'Gourmet Poultry Pilaf',
            category: 'Meat Meal',
            price: 60,
            ingredient1: 'Raw Whole Bird',
            ingredient2: 'Hylian Rice',
            ingredient3: 'Goat Butter',
            ingredient4: 'Bird Egg',
            description: 'Made with the highest-quality poultry, every bite of this pilaf floods your mouth with flavor.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/0/0d/BotW_Gourmet_Poultry_Pilaf_Icon.png'

        },
        {
            name: 'Meat-Stuffed Pumpkin',
            category: 'Meat Pie',
            price: 40,
            ingredient1: 'Fortified Pumpkin',
            ingredient2: 'Raw Prime Meat',
            description: 'This hollow, meat-filled fortified pumpkin is a local specialty or Kakariko Village.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/3f/BotW_Meat-Stuffed_Pumpkin_Icon.png'
        },
        {
            name: 'Herb Sauté',
            category: 'Vegetarian Meal',
            price: 15,
            ingredient1: 'Hyrule Herb',
            ingredient2: 'Goron Spice',
            description: "A fragrant mixture of herbs and spices. It's easily recognized by its unique aroma.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/d/d3/BotW_Herb_Saut%C3%A9_Icon.png'
        },
        {
            name: 'Monster Rice Balls',
            category: 'Meal',
            price: 100,
            ingredient1: 'Monster Extract',
            ingredient2: 'Hylian Rice',
            ingredient3: 'Rock Salt',
            description: 'Rice balls flavored with monster extract. Their unique aroma is not for everyone.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/3e/BotW_Monster_Rice_Balls_Icon.png'
        },
        {
            name: 'Mushroom Rice Balls',
            category: 'Vegetarian Meal',
            price: 50,
            ingredient1: 'Hylian Rice',
            ingredient2: 'Silent Shroom',
            ingredient3: 'Silent Princess',
            description: 'The aroma of the mushrooms tickles your nose as you peel back the leafy wrapping.',
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/23/BotW_Mushroom_Rice_Balls_Icon.png'
        },
        {
            name: 'Nutcake',
            category: 'Dessert',
            price: 40,
            ingredient1: 'Chickaloo Tree Nut',
            ingredient2: 'Tabantha Wheat',
            ingredient3: 'Cane Sugar',
            ingredient4: 'Goat Butter',
            description: "Forest nuts give this cake a pleasant texture and a simple, understated sweetness.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/d/dd/BotW_Nutcake_Icon.png'
        },
        {
            name: 'Pepper Seafood',
            category: 'Seafood Meal',
            price: 20,
            ingredient1: 'Sizzlefin Trout',
            ingredient2: 'Spicy Pepper',
            description: "The pepper seeds grilled with this seafood draw out its taste and pleasant aroma.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/a/ae/BotW_Pepper_Seafood_Icon.png'
        },
        {
            name: 'Pepper Steak',
            category: 'Meat Meal',
            price: 20,
            ingredient1: 'Raw Prime Meat',
            ingredient2: 'Spicy Pepper',
            description: "A dish made by cooking meat in crushed peppers, suppressing the gamy taste while accentuating its flavor.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/b2/BotW_Pepper_Steak_Icon.png'
        },
        {
            name: 'Poultry Curry',
            category: 'Meat Curry Meal',
            price: 30,
            ingredient1: 'Raw Bird Drumstick',
            ingredient2: 'Hylian Rice',
            ingredient3: 'Goron Spice',
            description: "The savory meat pairs well with the aroma of spice in this common curry.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c0/BotW_Poultry_Curry_Icon.png'
        },
        {
            name: 'Salmon Meunière',
            category: 'Seafood Meal',
            price: 75,
            ingredient1: 'Hearty Salmon',
            ingredient2: 'Goat Butter',
            ingredient3: 'Tabantha Wheat',
            description: "The crispy skin of this fried hearty salmon puts its texture in a class all its own.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/b4/BotW_Salmon_Meuni%C3%A8re_Icon.png'
        },
        {
            name: 'Wildberry Crepe',
            category: 'Dessert',
            price: 40,
            ingredient1: 'Wildberry',
            ingredient2: 'Fresh Milk',
            ingredient3: 'Tabantha Wheat',
            ingredient4: 'Cane Sugar',
            ingredient5: 'Bird Egg',
            description: "Sweet, tart wildberries are folded into thin, springy dough to make this dessert.",
            image: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/42/BotW_Wildberry_Crepe_Icon.png'
        }
    ]

    

master_ingredients_list = ingredients.map do |ing|
    

    {
        name: ing ? ing[:name] : nil,
        description: ing ? ing[:description] : nil,
        image: ing ? ing[:image].split("/revision")[0] : nil,
        category: ing ? ing[:category] : nil,
        price: ing ? ing[:price] : nil
    }
end



# binding.pry


Store.create!(name: "Lurelin General Store", description: "For all your daily needs.")
Store.create!(name: "The Slippery Falcon", description: "The best butcher in all of Hyrule! Specialty meat and dairy products.")
Store.create!(name: "Kara Kara Bazaar", description: "Exotic imports from the Gerudo Desert.")
Store.create!(name: "East Wind", description: "Items from all over Hyrule.")
Store.create!(name: "Olkin's Produce", description: "We carry a wide variety of produce.")
Recipe.create!(recipes_list)
Ingredient.create!(master_ingredients_list)


puts "Done Seeding"

