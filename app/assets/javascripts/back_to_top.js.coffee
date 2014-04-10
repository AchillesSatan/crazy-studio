$(document).ready ->
  
  # hide #back-top first
  $("#back-top").hide()
  
  # fade in #back-top
  $ ->
    $(window).scroll ->
      if $(this).scrollTop() > 100
        $("#back-top").fadeIn()
      else
        $("#back-top").fadeOut()
      return

    
    # scroll body to 0px on click
    $("#back-top a").click ->
      $("body,html").animate
        scrollTop: 0
      , 800
      false

    return

  return
