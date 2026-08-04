import * as v from 'valibot'

export const useFrameSearchSchema = function () {
  const frameSearchSchema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tag_name: v.pipe(v.string(), v.maxLength(10)),
  })

  return { frameSearchSchema }
}
