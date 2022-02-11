require 'pry'


response2 = HTTParty.get('https://zelda.fandom.com/wiki/Material')
html2 = Nokogiri::HTML(response2)
tables2 = html2.css('table')

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
            additional_info: cell_array[3].inner_text

        }
    end
end.compact.filter{|mat| mat.has_key?(:additional_info)}

filtered_materials = all_materials.filter do |ing_hash|
    ing_hash[:additional_info].match?(/cook|restore|hearts/) && !ing_hash[:additional_info].match?(/elixir/)
end

ingredients = filtered_materials.map do |mat|
    {
        name: mat[:name],
        price: mat[:price],
        description: mat[:description]
    }
end

# ingredients = filtered_materials.map do |mat|
#     if filtered_materials.length < 1 
#         nil
#     elsif mat[:name].match?(/Apple|Lotus|Durian|Hydromelon|Banana|Fruit|Pepper|Voltfruit|Wildberry/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Fruit" 
#         }
#     elsif mat[:name].match?(/Truffle|Chillshroom|Shroom|Ironshroom|Razorshroom|Rushroom|Sunshroom|Zapshrrom/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Mushroom" 
#         } 
#     elsif mat[:name].match?(/Radish|Carrot|Pumpkin/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Vegetable" 
#         }
#     elsif mat[:name].match?(/Meat/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Red Meat" 
#         }
#     elsif mat[:name].match?(/Bird/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Poultry" 
#         }
#     elsif mat[:name].match?(/Crab/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Crab"  
#         }
#     elsif mat[:name].match?(/Bass|Trout|Porgy|Carp|Salmon/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Fish"  
#         } 
#     elsif mat[:name].match?(/Snail/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Snail"
#         }
#     elsif mat[:name].match?(/Acorn|Egg|Chickaloo|Honey|Butter|Rice|Spice|Wheat|Milk|Sugar/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Misc" 
#         }
#     elsif mat[:name].match?(/Armoranth|Nightshade|Saffina|Herb|Thistle|Princess|Violet/)
#         {
#             name: mat[:name],
#             description: mat[:description],
#             price: mat[:price],
#             category: "Herb"
#         }
        
#     end     
# end

binding.pry



ingredients.each{|mat| Ingredient.create!(mat)}




