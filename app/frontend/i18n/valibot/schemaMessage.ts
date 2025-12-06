import * as v from 'valibot'

const schemaMessage = () => {
  v.setSchemaMessage((issue) => `Invalid type: Please enter as type ${issue.expected || ''}, not type ${issue.received}`, 'en')
  v.setSchemaMessage((issue) => `無効な型です：${issue.received}型ではなく${issue.expected || ''}型で入力してください`, 'ja')
}

export { schemaMessage }
