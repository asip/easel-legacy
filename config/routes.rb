# frozen_string_literal: true

# rubocop: disable Metrics/BlockLength
Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'dashboard#show'

  get '/frames/' => 'frames#index', :as => :frames
  resources :users, except: [:index] do
    resource :follow_relationships, only: %i[create destroy]
    get 'followees' => 'follow_relationships#followees', as: 'followees'
    get 'followers' => 'follow_relationships#followers', as: 'followers'
  end
  resources :frames do
    get :next, on: :collection
    get :prev, on: :collection
  end

  get '/signup' => 'users#new', :as => 'signup'
  resources :sessions, only: %i[new create destroy]
  get '/login' => 'sessions#new', :as => 'login'
  get '/profile' => 'sessions#show', :as => 'profile'
  get '/profile/edit' => 'users#edit', :as => 'edit_profile'
  patch '/profile' => 'users#update', :as => 'update_profile'
  delete '/logout' => 'sessions#destroy', :as => 'logout'

  namespace :api do
    namespace :v1 do
      # get '/frames/:frame_id/comments' => 'comments#index'
      # post '/frames/:frame_id/comments' => 'comments#create'
      # delete '/comments/:id' => 'comments#destroy'
      resources :frames, only: [:index] do
        resources :comments, only: %i[index create]
      end
      resources :comments, only: [:destroy]

      get '/account' => 'account#show'
    end
    namespace :front do
      namespace :v1 do
        resource :sessions, only: %i[create] do
          delete '/logout' => '/api/front/v1/sessions#destroy'
        end
        resources :users, only: %i[show create] do
          resource :follow_relationships, only: %i[create destroy]
        end
        get '/profile' => '/api/front/v1/sessions#show'
        put '/profile' => '/api/front/v1/users#update'
        get '/profile/following/:user_id' => '/api/front/v1/follow_relationships#following'
        resources :frames, only: %i[index show create update destroy] do
          resources :comments, only: %i[index create]
        end
        resources :comments, only: [:destroy]
      end
    end
  end
end
# rubocop: enable Metrics/BlockLength
