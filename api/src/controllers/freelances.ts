import { Context } from 'koa'

// To replicate a freelance DB
enum Language {
  FRENCH = 'FRENCH',
  ENGLISH = 'ENGLISH',
  KLINGON = 'KLINGON',
}
const mockFreelancesDB = [
  {
    id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b',
    avatar: {
      '64x64': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png',
      '256x256': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/256x256.png',
      '512x512': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/512x512.png',
    },
    firstname: 'Gordon',
    lastname: 'Champlin',
    language: Language.KLINGON,
    birthDate: '1990-12-31',
    isVisible: false,
    retribution: 500,
  },
  {
    id: 'e3a327af-252d-5894-a76a-7616de440b5e',
    avatar: null,
    firstname: 'Simon',
    lastname: 'Templar',
    language: Language.FRENCH,
    birthDate: '1980-01-23',
    isVisible: true,
    retribution: 850,
  },
  {
    id: 'b805cabc-2e32-58be-a11e-e5aa61c45947',
    avatar: null,
    firstname: 'Omar',
    lastname: 'Si',
    language: Language.FRENCH,
    birthDate: '1981-02-17',
    isVisible: true,
    retribution: 1200,
  },
]

export const show = (ctx: Context) => {
  // With a true DB context, the 2 checks on ID could be exported in a middleware. For the purpose of this exercice, i will let check inside the controller
  if (!ctx?.params?.id) {
    return ctx.throw(404, 'Freelance ID is missing')
  }
  const freelance = mockFreelancesDB.find(({ id }) => id === ctx.params.id)
  if (!freelance) {
    return ctx.throw(404, `Freelance ID ${ctx.params.id} is unknown`)
  }

  ctx.body = freelance
  ctx.status = 200
}

export const update = (ctx: Context) => {
  if (!ctx?.params?.id) {
    return ctx.throw(404, 'Freelance ID is missing')
  }
  const freelance = mockFreelancesDB.find(({ id }) => id === ctx.params.id)
  if (!freelance) {
    return ctx.throw(404, `Freelance ID ${ctx.params.id} is unknown`)
  }

  // Update the mockFreelancesDB object
  for (const key in freelance) {
    if (key !== 'id' && ctx?.request?.body?.[key]) {
      freelance[key] = ctx.request.body[key]
    }
  }

  ctx.body = freelance
  ctx.status = 200
}

export const getLanguages = (ctx: Context) => {
  ctx.body = Language
  ctx.status = 200
}
