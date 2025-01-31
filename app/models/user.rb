class User < ApplicationRecord
    has_many :shelves
    has_many :books, through: :shelves

    has_secure_password
    validates :name, :password, presence: true
    validates :name, uniqueness: true
end
