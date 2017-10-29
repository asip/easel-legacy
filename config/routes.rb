Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.htm
  root 'dashboard#show'

  #get '/frame/' => 'frame#new'
  #post '/frames/' => 'frame#create'
  get '/frames/' => 'frames#index', as: :frames
  resources :frames
end
