module Playbasis
  class Configuration
    OPTIONS = {
      api_key: -> { ENV['PLAYBASIS_API_KEY'] },
      api_secret: -> { ENV['PLAYBASIS_API_SECRET'] },
      base_url: 'https://api.pbapp.net',
      storage: {}
    }.freeze

    attr_accessor(*OPTIONS.keys)

    def initialize
      OPTIONS.each do |name, val|
        value = val.respond_to?(:lambda?) && val.lambda? ? val.call : val
        instance_variable_set("@#{name}", value)
      end
    end

    def [](option)
      send(option)
    end

    def to_hash
      OPTIONS.keys.each_with_object({}) do |option, hash|
        hash[option.to_sym] = send(option)
      end
    end

    def merge(options)
      OPTIONS.keys.each do |name|
        instance_variable_set("@#{name}", options[name]) if options[name]
      end
    end
  end
end
