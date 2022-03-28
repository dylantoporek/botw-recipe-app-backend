class Api::V1::UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    def create
        user = User.create!(user_params)
        Kitchen.create!(user_id: user.id)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user
    end

    def update
        user = @current_user
        user.update(
            bank: params[:bank]
        )
        render json: user, status: :ok
    end



    private
    
    def user_params
        params.permit(:username, :password, :password_confirmation, :bank)
    end
end
