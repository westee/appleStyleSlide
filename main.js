$(document).ready(function () {
			/* DOM加载完执行这些代码 */
			var pos=1;
			var totWidth = 0;
			var positions = new Array();

			$('#slides .slide').each(function (i) {

				/* 遍历所有幻灯片并将其累积宽度存储在总体宽度中*/
				positions[i] = totWidth;
				totWidth += $(this).width();
				// this是<div class="slide">
				//<img src="./images/macbook.jpg" width="920" height="400" alt="side">
				/* 这个positions数组包含每个 slides  */
			});
			$('#slides').width(totWidth); //  设置一下宽度

			// 改变容器div的宽度为slides组合的准确宽度
			$('#menu ul li a').click(function (e, keepScroll) {

					$('li.menuItem').removeClass('act').addClass('inact');
					//this是被点击的a标签
					$(this).parent().addClass('act');
					//给this的爸爸们添加act(所有的四个 ,后添加的act会起作用)
					pos = $(this).parent().prevAll('.menuItem').length;
					console.log(pos)
					//.prevAll()  获得当前匹配元素集合中每个元素的前面的同胞元素
					$('#slides').stop().animate({
						//.stop() 停止当前进行的动画
						//animate()  通过css将一个元素从一个状态变为另一个状态,css属性是渐变的,因此可以产生动画
						marginLeft: -positions[pos%4] + 'px'
					}, 1000);
					/* 开始轮播 */

					e.preventDefault();
					if (!keepScroll) {
						clearInterval(itvl); // 如果一个图标被点击则停止其动作 
						setTimeout(() => {
							itvl = setInterval(function () {
								autoAdvance()
							}, changeEvery * 1000);
						}, 1000)
					}
					});

				$('#menu ul li.menuItem:first').addClass('act').siblings().addClass('inact');
				/* 页面加载后,给第一个thumbnail添加act类,它的兄弟添加inact类 */
				
				function autoAdvance() {
					$('#menu ul li a').eq(pos%4).trigger('click', true);
					pos++
				}

				// 轮播间隔
				var changeEvery = 2;
				var itvl = setInterval(function () {
					autoAdvance()
				}, changeEvery * 1000);
			});