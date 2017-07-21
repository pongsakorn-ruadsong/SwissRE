class User
  include ActiveModel::Validations

  attr_accessor :email, :first_name, :last_name

  def initialize(params)
    @email = params[:email]
    @first_name = params[:first_name]
    @last_name = params[:last_name]
  end

  def id
    @id ||= Digest::SHA1.hexdigest("#{@email}#{@first_name}#{@last_name}")
  end

  validates :email, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
end
