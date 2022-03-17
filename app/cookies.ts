import { createCookie } from 'remix'

export const favoriteTeam = createCookie('favoriteTeam', {
  maxAge: 604_800, // one week
})
