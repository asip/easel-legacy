

export function useConstants() {
  const baseURL = '/api/front/v1'

  return { baseURL }
}

export type ConstantsType = ReturnType<typeof useConstants>
