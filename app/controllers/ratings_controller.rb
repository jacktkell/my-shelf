class RatingsController < ApplicationController

    def index 
        ratings = Rating.all 
        render json: ratings 
    end

    def create 
        rating = Rating.create(book_id:params[:book_id], rating:params[:rating])
        render json: rating, status: :created
    end
end
