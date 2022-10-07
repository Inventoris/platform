/**
 * @param {Window} window
 */
module.exports = function (window) {
  const content = window.document.querySelector('.article__content-inner')
  const color = content?.querySelectorAll('.token.color')

  color?.forEach((item) => item.style.setProperty('--color-picker', ` ${item.textContent}`))
}
