

export function useConstants() {
  const baseURL = '/front/api/v1'

  return { baseURL }
}

export type ConstantsType = ReturnType<typeof useConstants>
