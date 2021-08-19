class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :book_id, :content
end
