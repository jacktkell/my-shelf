class Book < ApplicationRecord
    has_many :shelves
    has_many :reviews
    has_many :ratings
    has_many :users, through: :shelves
end
