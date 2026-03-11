export function resolveHtmlUrls(html: string): string {
  const base = import.meta.env.BASE_URL
  const doc = new DOMParser().parseFromString(html, 'text/html')

  doc.querySelectorAll('[src], [href]').forEach((el) => {
    const attr = el.getAttribute('src') ? 'src' : 'href'
    const val = el.getAttribute(attr)

    if (val && val.startsWith('/')) {
      el.setAttribute(attr, base.replace(/\/$/, '') + val)
    }
  })

  doc.querySelectorAll('[poster]').forEach((el) => {
    const attr = 'poster'
    const val = el.getAttribute(attr)

    if (val && val.startsWith('/')) {
      el.setAttribute(attr, base.replace(/\/$/, '') + val)
    }
  })

  doc.querySelectorAll('[srcset]').forEach((el) => {
    const srcset = el.getAttribute('srcset')
    if (!srcset) return

    const resultSrcset: string[] = []
    srcset
      .trim()
      .split(',')
      .map((item) => {
        const [url, descriptor] = item.trim().split(/\s+/, 2)
        if (url?.startsWith('/')) {
          resultSrcset.push(base.replace(/\/$/, '') + url + ' ' + (descriptor ? descriptor : ''))
        }
      })
    el.setAttribute('srcset', resultSrcset.join(', '))
  })

  return (
    '<style>' +
    doc.head.getElementsByTagName('style')[0]?.innerHTML +
    '</style>' +
    doc.body.innerHTML
  )
}
