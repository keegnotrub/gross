class PagesController < ApplicationController
  def welcome
    @title = "Welcome"
    
    render_react name: "Ryan"
  end

  def about
    @title = "About"
    
    render_react
  end
end
