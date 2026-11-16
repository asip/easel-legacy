import type { PreparedPhotoSwipeOptions } from 'photoswipe'
import PhotoSwipeLightbox from 'photoswipe/lightbox'

export const usePhotoSwipe = function (
  selector: string,
  options?: Partial<PreparedPhotoSwipeOptions> & { anchor?: string },
) {
  const anchor = options?.anchor ? options.anchor : 'a'
  if (options?.anchor) delete options.anchor
  const initialZoomLevel = options?.initialZoomLevel ?? 'fit'

  let lightbox: PhotoSwipeLightbox | undefined

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

    lightbox = new PhotoSwipeLightbox({
      ...options,
      gallery: selector,
      children: anchor,
      initialZoomLevel,
      pswpModule: () => import('photoswipe'),
    })

    extensions(lightbox)

    lightbox.init()
  }

  let extensions: (lightbox: PhotoSwipeLightbox) => void = () => undefined

  const extend = (func: (lightbox: PhotoSwipeLightbox) => void): void => {
    extensions = func
  }

  const loadImage = async (src: string): Promise<HTMLImageElement> => {
    const img: HTMLImageElement = new globalThis.Image()
    img.src = src
    await img.decode()
    return img
  }

  return { lightbox, init, extend }
}
