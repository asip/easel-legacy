import * as v from 'valibot'

const maxLengthMessage = (max: number) => {
  v.setSpecificMessage(v.maxLength, `are limited to ${max.toString()} characters.`, 'en')
  v.setSpecificMessage(v.maxLength, `${max.toString()}文字以内で入力してください`, 'ja')
}

export { maxLengthMessage }
