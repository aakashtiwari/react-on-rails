class Tagging < ApplicationRecord
  belongs_to :problem
  belongs_to :tag
end
