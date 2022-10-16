// 首先是一个立即执行函数，执行时传入的参数是window和document
(function flexible (window, document) {
    var docEl = document.documentElement // 返回文档的root元素
    var dpr = window.devicePixelRatio || 1 
    // 获取设备的dpr，即当前设置下物理像素与虚拟像素的比值
  
    // 调整body标签的fontSize，fontSize = (12 * dpr) + 'px'
    // 设置默认字体大小，默认的字体大小继承自body
    function setBodyFontSize () {
      if (document.body) {
        document.body.style.fontSize = (12 * dpr) + 'px'
      } else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }
    setBodyFontSize();
  
    // set 1rem = viewWidth / 10
    // 设置root元素的fontSize = 其clientWidth / 10 + ‘px’
    function setRemUnit () {
      var rem = docEl.clientWidth / 10
      docEl.style.fontSize = rem + 'px'
    }
    // 移动端的适配如何做
    // (1): 所有的css单位, rem    (vscode可以自动把px转成rem, pxtorem插件设置基准值37.5) - 1rem等于37.5px
    //  原理: rem要根据html的font-size换算
    //  目标: 网页宽度变小, html的font-size也要变小, ...网页变大, html的font-size变大.
    // (2): flexible.js (专门负责当网页宽度改变, 会修改html的font-size)
  
    setRemUnit()
  
  
      // 当我们页面尺寸大小发生变化的时候，要重新设置下rem 的大小
      window.addEventListener('resize', setRemUnit)
          // pageshow 是我们重新加载页面触发的事件
      window.addEventListener('pageshow', function(e) {
          // e.persisted 返回的是true 就是说如果这个页面是从缓存取过来的页面，也需要从新计算一下rem 的大小
          if (e.persisted) {
              setRemUnit()
          }
      })
  
    // 检测0.5px的支持，支持则root元素的class中有hairlines
    if (dpr >= 2) {
      var fakeBody = document.createElement('body')
      var testElement = document.createElement('div')
      testElement.style.border = '.5px solid transparent'
      fakeBody.appendChild(testElement)
      docEl.appendChild(fakeBody)
      if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines')
      }
      docEl.removeChild(fakeBody)
    }
  }(window, document))
  