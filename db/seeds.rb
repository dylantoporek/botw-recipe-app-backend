require 'pry'
puts "Seeding Data"

response = HTTParty.get('https://zelda-cookbook-backend.herokuapp.com/api/v1/recipes')

response2 = HTTParty.get('https://zelda.fandom.com/wiki/Material')
html2 = Nokogiri::HTML(response2)
tables2 = html2.css('table')


response3 = HTTParty.get('https://zelda.fandom.com/wiki/Food#List_of_Food')
html = Nokogiri::HTML(response3)
tables = html.css('table')

recipes_info = tables[4].css('tr')


all_recipes_info = recipes_info.map do |row|
    cell_array = row.css('td')
    if cell_array.empty? 
        nil
    else 
        {
            name: cell_array[0].inner_text,
            image: cell_array[0].children.children[0].attributes['data-src'].value,
            description: cell_array[1].inner_text
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

materials = tables2[2].css('tr')

all_materials = materials.map do |row|
    cell_array = row.css('td')
    if cell_array.empty? 
        nil
    else
        {
            name: cell_array[0].inner_text,
            description: cell_array[1].inner_text,
            price: cell_array[2].inner_text,
            additional_info: cell_array[3].inner_text,
            image: cell_array[0].children.children[0].attributes['href'].value

        }
    end
end.compact.filter{|mat| mat.has_key?(:additional_info)}

filtered_materials = all_materials.filter do |ing_hash|
    ing_hash[:additional_info].match?(/cook|Restores|hearts/) && !ing_hash[:additional_info].match?(/elixir/)
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
    elsif mat[:name].match?(/Acorn|Egg|Chickaloo|Honey|Butter|Rice|Spice|Wheat|Milk|Sugar/)
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

    recipes_list = response.map do |item|
 
        specific_info = description_list.find do |info|
            name_for_search = info[:name].chomp
            item['name'].match?(name_for_search)
        end

        
        
        # binding.pry
        {
            name: item['name'],
            category: item['type'],
            price: item['resale'],
            ingredient1: item['ingredient1'],
            ingredient2: item['ingredient2'],
            ingredient3: item['ingredient3'],
            ingredient4: item['ingredient4'],
            ingredient5: item['ingredient5'],
            description: specific_info ? specific_info[:description].chomp : nil,
            image: specific_info ? specific_info[:image].split("/revision")[0] : nil
            
        }

    end

    

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

