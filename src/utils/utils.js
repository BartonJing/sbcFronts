import {Message} from 'element-ui'
import {t} from '../i18n/i18n'
export const isEmpty = (...args) => {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i]
    if (argument == null || argument === '' || argument === undefined) {
      // Message.warning({message: '数据不能为空!'})
      Message.warning({message: t('message.sys_not_empty')})
      return false
    }
  }
  return true
}
