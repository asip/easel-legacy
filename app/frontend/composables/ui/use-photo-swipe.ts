import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-expect-error : @types doesn't exist
import PhotoSwipeFullscreen from 'photoswipe-fullscreen'

export function usePhotoSwipe({ selector, anchor }: { selector: string, anchor: string }) {
  const assignSize = async (): Promise<void> => {
    const galleryAnchors = globalThis.document.querySelectorAll(`${selector} ${anchor ? anchor : 'a'}`)

    for (const el of galleryAnchors) {
      const img: HTMLImageElement = await loadImage((el as HTMLLinkElement).href)

      el.setAttribute('data-pswp-width', img.naturalWidth.toString())
      el.setAttribute('data-pswp-height', img.naturalHeight.toString())
      el.firstElementChild?.removeAttribute('style')
    }
  }

  const initPhotoSwipe = () => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: selector,
      children: anchor ? anchor : 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })
    new PhotoSwipeFullscreen(lightbox) // eslint-disable-line
    lightbox.init()

    return lightbox
  }

  const loadImage = async (src: string): Promise<HTMLImageElement> => {
    const img: HTMLImageElement = new globalThis.Image()
    img.src = src
    await img.decode()
    return img
  }

  return { initPhotoSwipe, assignSize }
}
