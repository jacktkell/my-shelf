class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    #just to verify data
    def index
        render json: User.all
    end

    #create a user via signing in
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    #update a user's profile
    def update 
        @current_user.update(user_params)
        render json: @current_user
    end

    #return signed in user
    def show 
        render json: @current_user
    end

    private

    #parameters a user will need to sign up and update profile
    def user_params
        params.require(:user).permit(:name, :password, :fav_genre, :bio)
    end

    def update_params
        params.require(:user).permit(:name, :fav_genre, :bio)
    end
end
