import type { PreparedPhotoSwipeOptions } from 'photoswipe'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// // @ts-expect-error : @types doesn't exist
// import PhotoSwipeFullscreen from 'photoswipe-fullscreen'

export const usePhotoSwipe = function (
  selector: string,
  options?: Partial<PreparedPhotoSwipeOptions> & { anchor?: string },
) {
  const anchor = options?.anchor ?? 'a'
  if (options?.anchor) delete options.anchor
  const initialZoomLevel = options?.initialZoomLevel ?? 'fit'

  const assignSize = async (): Promise<void> => {
    const anchors = globalThis.document.querySelectorAll(`${selector} ${anchor}`)

    for (const el of anchors) {
      const img: HTMLImageElement = await loadImage((el as HTMLLinkElement).href)

      el.setAttribute('data-pswp-width', img.naturalWidth.toString())
      el.setAttribute('data-pswp-height', img.naturalHeight.toString())
      el.firstElementChild?.removeAttribute('style')
    }
  }

  const init = async () => {
    await assignSize()

    const lightbox = new PhotoSwipeLightbox({
      ...options,
      gallery: selector,
      children: anchor,
      initialZoomLevel,
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

  return { init }
}
