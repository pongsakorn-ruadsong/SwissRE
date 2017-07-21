module Api
  class SessionsController < ApplicationController
    def destroy
      session[:current_user_id] = nil
      render json: {}
    end
  end
end
