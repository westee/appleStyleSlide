$(document).ready(function () {
	/* DOM加载完执行这些代码 */

	var totWidth = 0;
	var positions = new Array();

	$('#slides .slide').each(function (i) {

		/* Traverse through all the slides and store their accumulative widths in totWidth 
		遍历所有幻灯片并将其累积宽度存储在总体宽度中*/
		positions[i] = totWidth;
		totWidth += $(this).width();
		// this是<div class="slide">
		//<img src="./images/macbook.jpg" width="920" height="400" alt="side">
		//</div>
		/* The positions array contains each slide's commulutative offset from the left part of the container
		这个positions数组包含每个 slides  */
	});

	$('#slides').width(totWidth);   //  设置一下宽度

	/* Change the cotnainer div's width to the exact width of all the slides combined */
// 改变容器div的宽度为slides组合的准确宽度
	$('#menu ul li a').click(function (e, keepScroll) {

		/* 点击thumbnail */

		$('li.menuItem').removeClass('act').addClass('inact');
		//this是被点击的a标签
		$(this).parent().addClass('act');
		//给this的爸爸们添加act(所有的四个 ,后添加的act会起作用)
		var pos = $(this).parent().prevAll('.menuItem').length;
		//.prevAll()  获得当前匹配元素集合中每个元素的前面的同胞元素
		$('#slides').stop().animate({
			//.stop() 停止当前进行的动画
			//animate()  通过css将一个元素从一个状态变为另一个状态,css属性是渐变的,因此可以产生动画
			marginLeft: -positions[pos] + 'px'
		}, 1000);
		/* 开始轮播 */
		
		e.preventDefault();
		/* 阻止link的默认动作   Prevent the default action of the link */


		// 如果一个图标被点击则停止其动作 Stopping the auto-advance if an icon has been clicked:
		if (!keepScroll) clearInterval(itvl);
	});

	$('#menu ul li.menuItem:first').addClass('act').siblings().addClass('inact');
	/* 页面加载后,给第一个thumbnail添加act类,它的兄弟添加inact类 */
	var current = 1;

	function autoAdvance() {
		if (current == -1) return false;
		// console.log($('#menu ul li a').length)
		$('#menu ul li a').eq(current % $('#menu ul li a').length).trigger('click', [true]); // [true] will be passed as the keepScroll parameter of the click function on line 28
		current++;
	}

	// 轮播间隔

	var changeEvery = 2;

	var itvl = setInterval(function () {
		autoAdvance()
	}, changeEvery * 1000);

});


