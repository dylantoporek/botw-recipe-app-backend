class PantriesController < ApplicationController
    def index
        render json: @current_user.kitchen.pantries, status: :ok
    end

    def show
        pantry = @current_user.kitchen.pantries.find_by(id: params[:id])
        render json: pantry, status: :ok
    end

    def create
        pantry = @current_user.kitchen.pantries.create!(pantry_params)
        render json: pantry, status: :ok
    end

    def update
        pantry = @current_user.kitchen.pantries.find_by(id: params[:id])
        pantry.update(
            quantity: params[:quantity]
        )
        render json: pantry, status: :ok 
    end

    def destroy
        pantry = @current_user.kitchen.pantries.find_by(id: params[:id])
        pantry.delete
        head :no_content
    end

    private

    def pantry_params
        params.permit(:kitchen_id, :ingredient_id, :quantity)
    end
end
