class InfosController < ApplicationController
    skip_before_action :authorize
    def index
        render json: Info.all, status: :ok
    end
    
    def show
        info = Info.find_by(id: params[:id])
        render json: info, status: :ok
    end
    
end
