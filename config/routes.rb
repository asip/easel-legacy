Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.htm
  root 'dashboard#show'

  get '/frames/' => 'frames#index', as: :frames
  resources :users, except: [:index]
  resources :sessions, only: [:new,:create,:destroy]
  resources :frames

  get '/signup' => 'users#new', as: 'signup'
  get '/login' => 'sessions#new', as: 'login'
  delete '/logout' => 'sessions#destroy', as: 'logout'
end
