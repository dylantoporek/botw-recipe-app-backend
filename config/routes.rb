Rails.application.routes.draw do
  resources :recipes, only: [:index, :show]
  resources :pantries, only: [:show, :create, :destroy, :update]
  resources :kitchens
  resources :ingredients, only: [:index, :show]
  resources :stores, only: [:index, :show]
  resources :users, only: [:create, :show, :update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
