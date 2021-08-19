class Rating < ApplicationRecord
    belongs_to :book

    #limits ratings to be through 1 and 10
    validates :rating, length: {in: 0..9}
end
