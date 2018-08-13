Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'dashboard#show'

  get '/frames/' => 'frames#index', as: :frames
  resources :users, except: [:index]
  resources :sessions, only: [:new,:create,:destroy]
  resources :frames

  get '/signup' => 'users#new', as: 'signup'
  get '/login' => 'sessions#new', as: 'login'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  namespace :api do
    namespace :v1 do
      get '/frames/:id/comments' => 'comments#index_by_frame_id'
      post '/frames/:id/comments' => 'comments#create'
      delete '/comments/:id' => 'comments#destroy'
    end
  end
end
