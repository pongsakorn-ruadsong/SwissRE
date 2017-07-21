module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.valid?
        result = client.users.register(@user.id, @user.email, @user.first_name, @user.last_name)

        if result[:body]['error_code'] == '0201'
          result = client.users.login(@user.id)
        end

        session[:current_user_id] = @user.id
        render json: @user
      else
        render json: @user
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end
  end
end
