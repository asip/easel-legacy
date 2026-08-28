import PhotoSwipeLightbox from 'photoswipe/lightbox'
// // @ts-expect-error : @types doesn't exist
// import PhotoSwipeFullscreen from 'photoswipe-fullscreen'

export const usePhotoSwipe = function ({
  selector,
  anchor = 'a',
  zoomLevel = 'fit',
}: {
  selector: string
  anchor?: string
  zoomLevel?: 'fit' | 'fill' | number
}) {
  const assignSize = async (): Promise<void> => {
    const anchors = globalThis.document.querySelectorAll(`${selector} ${anchor ? anchor : 'a'}`)

    for (const el of anchors) {
      const img: HTMLImageElement = await loadImage((el as HTMLLinkElement).href)

      el.setAttribute('data-pswp-width', img.naturalWidth.toString())
      el.setAttribute('data-pswp-height', img.naturalHeight.toString())
      el.firstElementChild?.removeAttribute('style')
    }
  }

  const initPhotoSwipe = async () => {
    await assignSize()

    const lightbox = new PhotoSwipeLightbox({
      gallery: selector,
      children: anchor,
      initialZoomLevel: zoomLevel,
      pswpModule: () => import('photoswipe'),
    })
    // new PhotoSwipeFullscreen(lightbox) // eslint-disable-line
    lightbox.init()

    return lightbox
  }

  const loadImage = async (src: string): Promise<HTMLImageElement> => {
    const img: HTMLImageElement = new globalThis.Image()
    img.src = src
    await img.decode()
    return img
  }

  return { initPhotoSwipe }
}
