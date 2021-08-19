class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password, :fav_genre, :bio, :user_books, :book_titles

  def user_books
    object.shelves.map do |shelf|
      shelf.book
    end
  end

  has_many :books
  def book_titles
    object.books.map do |book|
      book.title.split(',') 
    end 
  end
end
