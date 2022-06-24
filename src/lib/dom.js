export const h = ({ tag, attrs, children }) => {
  const el = document.createElement(tag)

  if (attrs) {
    for (const key in attrs) {
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2), attrs[key])
        continue
      }

      el.setAttribute(key, attrs[key])
    }
  }

  for (const child of children) {
    if (child === undefined || child === null) {
      continue
    }
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child))
    } else {
      el.appendChild(child)
    }
  }

  return el
}
