singleWidth = 0
initial = ()->
    screenWidth = document.body.clientWidth
    singleWidth = (screenWidth - 630) / 8
    $('.content .gallery').css "width", screenWidth + "px"
    $('.content .gallery .gallery-item:not(.first)').css "width", singleWidth + "px"
    pre=$('.content .gallery .gallery-item.first')
    pre.css "width", "630px"

pickCard= (e)->
    _this=e
    others=$('.content .gallery .gallery-item.normal')
    others.stop true,false
    others.find('img.normal').css "display","none"
    others.find('img_active').css "display","block"
    #            开始动画,当前选中的开始展开,其他收缩
    siblings=$(_this).siblings('.normal')
    siblings.animate {"width":singleWidth+"px"},'normal',false,->
        $(this).find('.active_img').css "display","none"
    others.find('img.normal').css "display","block"
    $(_this).find(".active_img").css "display","block"
    $(_this).animate({"width":"630px"})

$().ready ->
    initial()
    $('.content .gallery .gallery-item.normal').mouseenter ->
        pickCard this
    
    
    
    
