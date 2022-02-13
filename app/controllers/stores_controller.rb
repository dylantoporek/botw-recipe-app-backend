class StoresController < ApplicationController
    skip_before_action :authorize
    def index
        render json: Store.all, status: :ok
    end
    
    def show
        store = Store.find_by(id: params[:id])
        render json: store, status: :ok
    end
end
