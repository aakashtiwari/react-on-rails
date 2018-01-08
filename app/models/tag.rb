class Tag < ApplicationRecord
	has_many :taggings
	has_many :problems, through: :taggings
end
