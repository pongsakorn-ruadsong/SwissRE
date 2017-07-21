Rails.application.routes.draw do
  namespace :api do
    get '/contents', to: 'contents#index'
    get '/quizzes', to: 'quizzes#index'
    get '/goods', to: 'goods#all'
    get '/goods/:id', to: 'goods#details'
    get '/quizzes/:id/details', to: 'quizzes#details'
    get '/quizzes/:id/question', to: 'quizzes#question'
    get '/quizzes/player/:id/recent', to: 'quizzes#recent'
    post '/questions/:id/answer', to: 'questions#answer'

    delete '/sessions', to: 'sessions#destroy'

    resources :users, only: [:create]
  end

  get '*path', :to => 'pages#home'
  root to: 'pages#home'
end
