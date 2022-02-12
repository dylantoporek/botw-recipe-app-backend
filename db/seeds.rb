require 'pry'

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
    ing_hash[:additional_info].match?(/cook|restore|hearts/) && !ing_hash[:additional_info].match?(/elixir/)
end

ingredients = filtered_materials.map do |mat|
    if mat[:name].match?(/Apple|Lotus|Durian|Hydromelon|Banana|Fruit|Pepper|Voltfruit|Wildberry/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Fruit"
        }
    elsif mat[:name].match?(/Truffle|Chillshroom|Shroom|Ironshroom|Razorshroom|Rushroom|Sunshroom|Zapshroom/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Mushroom"
        }
    elsif mat[:name].match?(/Radish|Carrot|Pumpkin/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Vegetable"
        }
    elsif mat[:name].match?(/Meat/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Red Meat"
        }
    elsif mat[:name].match?(/Bird/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Poultry"
        }
    elsif mat[:name].match?(/Crab/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Crab"
        }
    elsif mat[:name].match?(/Carp|Porgy|Trout|Bass|Salmon/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Fish"
        }
    elsif mat[:name].match?(/Snail/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Snail"
        }
    elsif mat[:name].match?(/Acorn|Egg|Chickaloo|Honey|Butter|Rice|Spice|Wheat|Milk|Sugar/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Misc"
        }
    elsif mat[:name].match?(/Armoranth|Nightshade|Saffina|Herb|Thistle|Princess|Violet/)
        {
            name: mat[:name],
            price: mat[:price],
            description: mat[:description],
            image: mat[:image],
            category: "Herb"
        }
    end
end

recipes = response.map do |item|
    {
        name: item['name'],
        category: item['type'],
        price: item['resale'],
        ingredient1: item['ingredient1'],
        ingredient2: item['ingredient2'],
        ingredient3: item['ingredient3'],
        ingredient4: item['ingredient4'],
        ingredient5: item['ingredient5'],
        description: "",
        image: "",
    }
end


binding.pry

# ingredients.each{|mat| Ingredient.create!(mat)}




