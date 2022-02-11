require 'pry'


response2 = HTTParty.get('https://zelda.fandom.com/wiki/Material')
html2 = Nokogiri::HTML(response2)
tables2 = html2.css('table')

materials = tables2[2].css('tr')
all_materials = materials.map do |row|
    cell_array = row.css('td')
    binding.pry
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


binding.pry



# ingredients.each{|mat| Ingredient.create!(mat)}




