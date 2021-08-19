class RatingSerializer < ActiveModel::Serializer
  attributes :id, :book_id, :rating
end
