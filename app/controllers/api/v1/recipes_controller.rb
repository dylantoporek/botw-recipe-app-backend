class Api::V1::RecipesController < ApplicationController
    skip_before_action :authorize
    def index
        render json: Recipe.all, status: :ok
    end
    
    def show
        recipe = Recipe.find_by(id: params[:id])
        render json: recipe, status: :ok
    end

end
