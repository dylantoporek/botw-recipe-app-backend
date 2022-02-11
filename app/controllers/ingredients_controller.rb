class IngredientsController < ApplicationController

    def index
    render json: Ingredient.all, status: :ok
    end

    def show
    ingredient = Ingredient.find_by(id: params[:id])
    render json: ingredient, status: :ok
    end

    
end
