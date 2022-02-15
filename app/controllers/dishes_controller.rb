class DishesController < ApplicationController
    def index
        render json: @current_user.kitchen.dishes, status: :ok
    end

    def show
        dish = @current_user.kitchen.dishes.find_by(id: params[:id])
        render json: dish, status: :ok
    end

    def create
        dish = @current_user.kitchen.dishes.create!(dish_params)
        render json: dish, status: :ok
    end

    def update
        dish = @current_user.kitchen.dish.find_by(id: params[:id])
        dish.update(
            quantity: params[:quantity]
        )
        render json: dish, status: :ok 
    end

    def destroy
        dish = @current_user.kitchen.dishes.find_by(id: params[:id])
        dish.delete
        head :no_content
    end

    private

    def dish_params
        params.permit(:quantity, :recipe_id, :kitchen_id)
    end
end
