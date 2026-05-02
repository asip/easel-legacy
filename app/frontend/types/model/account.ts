import { User } from './user'

export interface Account extends User {
  email?: string | null
  socialLogin?: boolean | null
}
