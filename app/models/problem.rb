class Problem < ApplicationRecord
	has_many :taggings
  has_many :tags, through: :taggings

  include Workflow
  workflow do
    state :new do
      event :submit, :transitions_to => :awaiting_review
    end
    state :awaiting_review do
      event :review, :transitions_to => :being_reviewed
    end
    state :being_reviewed do
      event :accept, :transitions_to => :accepted
      event :reject, :transitions_to => :rejected
    end
    state :accepted
    state :rejected
  end


  def all_tags=(names)
    self.tags = names.map do |name|
        Tag.where(name: name.upcase).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(", ")
  end

end
