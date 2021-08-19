class ReviewsController < ApplicationController
    # just to verify data
    def index
        render json: Review.all
    end

    def create
        review = Review.create(book_id:params[:book_id], content:params[:content])
        render json: review, status: :created
    end
end
