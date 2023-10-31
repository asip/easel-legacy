# frozen_string_literal: true

# rubocop: disable Metrics/BlockLength
Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'frames#index'

  get '/frames/' => 'frames#index', :as => :frames
  resources :users, except: [:index] do
    resource :follow_relationships, only: %i[create destroy]
    get 'followees' => 'users#followees', as: 'followees'
    get 'followers' => 'users#followers', as: 'followers'
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
  delete '/account/logout' => 'sessions#destroy', :as => 'account_logout'

  post 'oauth/callback', to: 'oauths#callback'
  get 'oauth/callback', to: 'oauths#callback'

  namespace :manager do
    resources :sessions, only: %i[new create destroy]
    get 'login' => 'sessions#new', :as => 'login'
  end
  delete '/logout' => 'manager/sessions#destroy', as: 'logout'

  namespace :api do
    namespace :front do
      namespace :v1 do
        resources :frames, only: [] do
          get '/comments' => '/api/front/v1/frames#comments'
          resources :comments, only: %i[create]
        end
        resources :comments, only: [:destroy]

        get '/account' => '/api/front/v1/account#show'
      end
    end
  end
end
# rubocop: enable Metrics/BlockLength
