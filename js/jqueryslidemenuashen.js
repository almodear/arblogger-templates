/*********************
//* jQuery Multi Level CSS Menu #2- By Dynamic Drive: http://www.dynamicdrive.com/
//* Last update: Nov 7th, 08': Limit # of queued animations to minmize animation stuttering
//* Menu avaiable at DD CSS Library: http://www.dynamicdrive.com/style/
*********************/

var jqueryslidemenu={

animateduration: {over: 200, out: 100}, //duration of slide in/ out animation, in milliseconds

buildmenu:function(menuid){
	jQuery(document).ready(function($){
		var $mainmenu=$("#"+menuid+">ul")
		var $headers=$mainmenu.find("ul").parent()
		$headers.each(function(i){
			var $curobj=$(this)
			var $subul=$(this).find('ul:eq(0)')
			this._dimensions={w:this.offsetWidth, h:this.offsetHeight, subulw:$subul.outerWidth(), subulh:$subul.outerHeight()}
			this.istopheader=$curobj.parents("ul").length==1? true : false
			$subul.css({top:this.istopheader? this._dimensions.h+0+"px" : 0})
			
			$curobj.mouseover(
				function(e){
					var $parent = $(this);
					$parent.addClass("select");
				}
			)
			$curobj.mouseout(
				function(e){
					var $parent = $(this);
					$parent.removeClass("select");
				}
			)
			
			$curobj.hover(
				function(e){
					var $targetul=$(this).children("ul:eq(0)")
					this._offsets={right:$(this).offset().right, top:$(this).offset().top}
					var menuright=this.istopheader? 0 : this._dimensions.w
					menuright=(this._offsets.right+menuright+this._dimensions.subulw>$(window).width())? (this.istopheader? -this._dimensions.subulw+this._dimensions.w : -this._dimensions.w)+1 : menuright-1
					
					if ($targetul.queue().length<=1) //if 1 or less queued animations
						$targetul.css({right:menuright+"px", width:this._dimensions.subulw+'px'}).slideDown(jqueryslidemenu.animateduration.over)
				},
				function(e){
					var $targetul=$(this).children("ul:eq(0)")
					$targetul.slideUp(jqueryslidemenu.animateduration.out)
				}
			) //end hover
		}) //end $headers.each()
		$mainmenu.find("ul").css({display:'none', visibility:'visible'})
	}) //end document.ready
}
}

//build menu with ID="mainnav" on page:
jqueryslidemenu.buildmenu("mainmenu")