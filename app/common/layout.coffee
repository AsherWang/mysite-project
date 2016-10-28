$().ready ->
    content = $ ".body"
    sopposedWidth = document.body.clientHeight - $(".header").height() - $(".footer").height() - 60
    content.css("height",sopposedWidth) if content.height() < sopposedWidth