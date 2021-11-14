window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerHTML = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText('banners'
      ,' <ul><li class="github"><a href="https://github.com/tumuyan/ShortcutMapper_Chinese/tree/electron-app">Github<span class="icon"></span></a>  </li></ul>'
      )
    }
    
  })

