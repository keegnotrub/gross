class PagesController < ApplicationController
  def welcome
    @name = "Ryan"

    render_react name: @name
  end

  def about
    render_react
  end
end
