Rails.application.routes.draw do
  resources :dishes
  resources :infos, only:[:index]
  resources :recipes, only: [:index, :show]
  resources :pantries
  resources :kitchens, only: [:show, :create]
  resources :ingredients, only: [:index, :show]
  resources :stores, only: [:index, :show]
  resources :users, only: [:update]
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
