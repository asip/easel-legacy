import * as v from 'valibot'

const maxLengthMessage = () => {
  v.setSpecificMessage(v.maxLength, (issue) => `are limited to ${issue.requirement.toString()} characters.`, 'en')
  v.setSpecificMessage(v.maxLength, (issue) => `${issue.requirement.toString()}文字以内で入力してください`, 'ja')
}

export { maxLengthMessage }
