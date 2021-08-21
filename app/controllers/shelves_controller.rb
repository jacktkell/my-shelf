class ShelvesController < ApplicationController

    skip_before_action :authorize, only: :show
    
    # just to verify data
    def index
        render json: Shelf.all
    end

    def show 
        shelf = Shelf.find(params[:id])
        render json: shelf
    end

    #add book to user's shelf
    def create 
        shelf = Shelf.create(book_id:params[:book_id], user_id:session[:user_id])
        render json: shelf
    end

    def destroy 
        shelf = Shelf.find(params[:id])
        shelf.destroy
    end
end
