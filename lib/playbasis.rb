require 'playbasis/configuration'
require 'playbasis/access_token'
require 'playbasis/auth'
require 'playbasis/request'
require 'playbasis/client'

module Playbasis
  class << self
    attr_writer :configuration

    def configuration
      @configuration ||= Configuration.new
    end

    def configure
      yield(configuration)
    end
  end
end
