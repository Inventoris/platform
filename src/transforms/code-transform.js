const os = require('os')
const Prism = require('prismjs')
const prismLoadLanguages = require('prismjs/components/')

function renderLine(line) {
  return `<span class="code-block__line">
    <span class="code-block__line-number"></span>
    <span class="code-block__line-content">${line}</span>
  </span>`.replace(new RegExp(os.EOL, 'gi'), '')
}

// расстановка классов и атрибутов для элементов кода внутри тела статьи,
// подсветка синтаксиса,
// расстановка номеров строк
/**
 * @param {Window} DOM
 */
module.exports = function(DOM) {
  DOM.document.querySelector('.article__content')
    ?.querySelectorAll('pre[data-lang] > code')
    ?.forEach(codeBlock => {
      let lang = codeBlock.parentNode.getAttribute('data-lang').trim()

      if (lang === 'js') {
        lang = 'javascript'
      }

      if (lang) {
        prismLoadLanguages([lang])

        const lines = codeBlock.textContent
          .split(os.EOL)
          .filter((line, index, linesArray) => (index === 0 || index === linesArray.length -1) && line.trim() === '' ? false : true)
          .map((line) => renderLine(Prism.highlight(line, Prism.languages[lang], lang)))
          .join(os.EOL)

        codeBlock.innerHTML = lines
      }

      codeBlock.parentNode.classList.add('code-block font-theme font-theme--code')
      codeBlock.parentNode.setAttribute('tabindex', 0)
      codeBlock.classList.add('code-block__content')
    })
}