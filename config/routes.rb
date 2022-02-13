Rails.application.routes.draw do
  resources :dishes
  resources :infos, only:[:index]
  resources :recipes, only: [:index, :show]
  resources :pantries
  resources :kitchens, only: [:show, :create, :update]
  resources :ingredients, only: [:index, :show]
  resources :stores, only: [:index, :show]
  resources :users, only: [:create, :show, :update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
