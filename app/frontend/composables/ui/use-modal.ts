export const useModal = function () {
  const modals: Partial<Record<string, HTMLDialogElement>> = {}

  const getModal = (selector: string): HTMLDialogElement | null => {
    const modalEl: HTMLDialogElement | null =
      modals[selector] ?? globalThis.document.querySelector(selector)
    if (modalEl && !modals[selector]) modals[selector] = modalEl
    return modalEl
  }

  const openModal = (selector: string): void => {
    const modalEl: HTMLDialogElement | null = getModal(selector)
    modalEl?.showModal()
  }

  return { openModal }
}
