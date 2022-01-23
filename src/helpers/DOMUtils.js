import he from 'he'

const anchorAddAttributes = (htmlCollection) => {
  // we assume the collection contains only <a> elements
  if (htmlCollection.length > 0) {
    for (const element of htmlCollection) {
      element.classList.add('btn')
      element.classList.add('btn__link')
      // check if the current anchor is an http* link
      if (element.href.slice(0, 4).toUpperCase() === 'HTTP') {
        element.target = '_blank'
        element.rel = 'noopener noreferrer'
      }
    }
  }
}


const clearChildren = (element) => {
  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild)
  }
}

const searchTagOnString = (string) => {
  const imgPattern = /<img [^>]*src="[^"]*"[^>]*>/gm
  const hrefPattern = /<img.*?src="(.*?)"/ // href & alt patterns could be improved
  const altPattern = /<img.*?alt="(.*?)"/

  // 1 get only img tags
  let imgCollection = string.match(imgPattern)
  return imgCollection.map((img) => {
    return {
      src: img.match(hrefPattern)[1].replace('/thumb/', '/'),
      thumb: img.match(hrefPattern)[1],
      alt: img.match(altPattern)[1],
    }
  })
}

const stringSanitizer = (array, property, limit) => {
  return array.slice(0, limit).map((item) => {
    item[property].rendered = he.decode(item[property].rendered)
    return item
  })
}


export
{
  anchorAddAttributes,
  clearChildren,
  searchTagOnString,
  stringSanitizer,
}
