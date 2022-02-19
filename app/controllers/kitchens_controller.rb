class KitchensController < ApplicationController
    skip_before_action :authorize, only: :create
    def index
        kitchen = @current_user.kitchen
        render json: kitchen, status: :ok
    end

    def create
        kitchen = Kitchen.create!(kitchen_params)
        render json: kitchen, status: :ok
    end

    private
    def kitchen_params
        params.permit(:user_id)
    end
end
