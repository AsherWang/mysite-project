resetBodyheight = ->
    content = $ ".body"
    sopposedWidth = document.body.clientHeight - $(".header").height() - $(".footer").height() - 60
    content.css("min-height", sopposedWidth) if content.height() < sopposedWidth

menuIniti = ->
    $(".header content ul li.category").onmouseover ->
        console.log 2333

$().ready ->
    setTimeout resetBodyheight,300