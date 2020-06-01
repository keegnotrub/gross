class ApplicationController < ActionController::Base
  around_action :hypernova_render_support

  def render_react(data = {}, opts = {})
    controller_name = opts[:controller] || self.controller_name
    action_name = opts[:action] || self.action_name

    key = opts[:key] || "#{controller_name}_#{action_name}".camelize
    
    render html: render_react_component(key, data), layout: true
  end
end
