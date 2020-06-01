require 'hypernova/plugins/development_mode_plugin'

Hypernova.configure do |config|
  config.host = "localhost"
  config.port = "3030"
end

Hypernova.add_plugin!(DevelopmentModePlugin.new)
