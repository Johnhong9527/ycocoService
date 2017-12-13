function init() {
  // 导航条联动动画,初始化
  navAnimation();

  // 导航条动画，设定
  function navAnimation() {
    let DOMTop = document.getElementById('nav'), // 获取导航对象
      clientHeight = document.documentElement.clientHeight, // 获取窗口可视区域高度
      clientWidth = document.documentElement.clientWidth, // 获取窗口可视区域宽度
      tru = true,  // 是否替换类名的依据
      scrollTop = scrollTopF(),
      clientHeightScrollTop = clientHeight + DOMTop.offsetTop + DOMTop.clientHeight; // 是否替换类名的依据
    // 获取不同浏览器的滚动条位置
    function scrollTopF() {
      let scrollTop = null;
      if (document.body.scrollTop !== 0) {
        scrollTop = document.body.scrollTop
      } else {
        scrollTop = document.documentElement.scrollTop
      }
      return scrollTop
    }

    // 监听文档滚动条事件，绑定动画
    document.addEventListener('scroll', function (event) {
      event.stopPropagation();
      // 重新赋值滚动条位置
      scrollTop = scrollTopF();
      if (tru && clientHeightScrollTop < clientHeight + scrollTop) {
        DOMTop.setAttribute('class', 'page-nav top');
        tru = false
      }
      if (clientHeightScrollTop > clientHeight + scrollTop) {
        DOMTop.setAttribute('class', 'page-nav');
        tru = true
      }
      // 标题动画与nav动画，联动
      titleAndNavAnimate();
      // 返回顶部事件处理
      hideTop();
    }, false);
    // 标题动画与nav动画，联动
    titleAndNavAnimate();

    function titleAndNavAnimate() {
      /*animate-in*/
      let animateIn = document.querySelectorAll('.container .title strong'),
        animationTop = document.querySelectorAll('.page-nav ul li');
      // 判断标题是否在可视区域。
      for (let i = 0; i < animateIn.length; i++) {
        if (scrollTop < animateIn[i].offsetTop && animateIn[i].offsetTop < scrollTop + clientHeight) {
          animateIn[i].setAttribute('class', 'animate-in');
        } else {
          animateIn[i].removeAttribute('class');
        }
        // nav联动动画
        /*
        滚动条的位置在内容区域内，在滚动条即将超出之后，执行类名切换。
         */
        // 获取内容区域的顶部。
        let sectionTop = animateIn[i].parentNode.parentNode.parentNode.offsetTop;
        // 获取内容区域的底部。
        let sectionBottom = animateIn[i].parentNode.parentNode.parentNode.clientHeight + sectionTop;
        if (scrollTop > sectionTop - clientHeight / 3 && sectionBottom > scrollTop + clientHeight / 3) {
          animationTop[i].setAttribute('class', 'animate-in animation-top');
        } else {
          animationTop[i].setAttribute('class', 'animation-top');
        }
      }
    }

    // 导航条滚动一定位置时，显示返回顶部按钮
    hideTop();

    function hideTop() {
      let pageTop = document.querySelector('.page-top.animation-top');
      if (scrollTop < clientHeight && clientWidth > 750) {
        pageTop.style.display = 'none'
      } else {
        pageTop.style.display = 'block'
      }
    }
  }


  /*
  # 锚链接跳转过度
  条件：
    1.目标位置 & 滚动条位置 距离过近
    2.目标位置 > 滚动条位置
    3.目标位置 < 滚动条位置
  策略：
    1.获取需要绑定事件的对象；
    2.使用for循环语句，给获取到的对象集合绑定事件；
    3.window.scrollTo(X,Y); 备注：X=window水平方向的滚动条移动位置；Y=window水平方向的滚动条移动位置;
    4.根据条件，执行不同事件。
    5.获取`目标位置 & 滚动条位置`的间距，除以25。然后用该数值与`滚动条位置`相加或相减。而累加或累减的过程通过setInterval()定时器方法来控制。
    6.程序执行完毕之后，用clearInterval()方法清除定时器。
   */
  anchorLinkJumpTransition();

  function anchorLinkJumpTransition() {
    let aTag = document.querySelectorAll('.animation-top a');
    for (let i = 0; i < aTag.length; i++) {
      aTag[i].addEventListener('click', function () {
        var $target = document.getElementById(this.hash.slice(1));
        scrollToTop($target.offsetTop);

        function scrollToTop(scrollDuration) {
          let scrollTop = null, // 滚动条当前位置
            scrollStep = null, // 滚动条累加前的位置
            s = 0; // 关闭计时器的条件 s = 25时
          if (document.body.scrollTop !== 0) {
            scrollTop = document.body.scrollTop
          } else {
            scrollTop = document.documentElement.scrollTop
          }
          scrollStep = scrollTop = Number.parseInt(scrollTop);
          console.log('滚动前，滚动条位置:' + scrollTop);
          console.log('目标位置：' + scrollDuration);
          // 目标位置 & 滚动条位置 距离过近
          console.log(Math.abs(scrollTop - scrollDuration))
          if (Math.abs(scrollTop - scrollDuration) > 21) {
            let scrollInterval = setInterval(function () {
              if (s < 26) {
                // s 是累加的，所以用来跟`目标位置 & 滚动条位置`的间距，相乘，获得过渡效果。
                window.scrollTo(0, scrollStep + (scrollDuration - scrollTop) / 25 * s);
                s++;
              }
              else {
                clearInterval(scrollInterval);
                scrollStep = null;
              }
            }, 10);
          }
        }
      }, false);
    }
  }

  // deBug
  let deBug = false;
  deBugF(deBug);

  function deBugF(deBug) {
    if (!deBug) {
      return;
    }
    console.log('deBug')
    let cLog = document.getElementById('cLog'); // 错误信息加载

    if (deBug) {
      cLog.style.display = 'block';
    }
    /*debug*/
    // cLog.innerHTML
  }
}


window.onload = init;
delete init();