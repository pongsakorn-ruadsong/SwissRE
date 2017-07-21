class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  private

  def client
    @client ||= Playbasis::Client.new(storage: session)
  end
end
