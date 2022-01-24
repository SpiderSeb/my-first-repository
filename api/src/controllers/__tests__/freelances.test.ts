import { createMockContext } from '@shopify/jest-koa-mocks'
import { getLanguages, show, update } from '../freelances'
export {}

describe('freelances getLanguages controller', () => {
  it('Get list of availables languages for freelances', () => {
    const mockContext = createMockContext()

    getLanguages(mockContext)
    expect(mockContext.status).toBe(200)
    expect(mockContext.body).toEqual({ ENGLISH: 'ENGLISH', FRENCH: 'FRENCH', KLINGON: 'KLINGON' })
  })
})

describe('freelances show controller', () => {
  it('Cannot show a freelance without ID', () => {
    const mockContext = createMockContext()

    show(mockContext)
    expect(mockContext.status).toBe(404)
    expect(mockContext.throw).toBeCalledWith(404, 'Freelance ID is missing')
  })

  it('Cannot show a freelance without ID', () => {
    const mockContext = createMockContext()
    mockContext.params = { id: 'toto' }

    show(mockContext)
    expect(mockContext.status).toBe(404)
    expect(mockContext.throw).toBeCalledWith(404, 'Freelance ID toto is unknown')
  })

  it('Show a freelance', () => {
    const mockContext = createMockContext()
    mockContext.params = { id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b' }

    show(mockContext)
    expect(mockContext.status).toBe(200)
    expect(mockContext.body).toEqual({
      avatar: {
        '256x256': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/256x256.png',
        '512x512': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/512x512.png',
        '64x64': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png',
      },
      birthDate: '1990-12-31',
      firstname: 'Gordon',
      id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b',
      isVisible: false,
      language: 'KLINGON',
      lastname: 'Champlin',
      retribution: 500,
    })
  })
})

describe('freelances update controller', () => {
  it('Cannot update a freelance without ID', () => {
    const mockContext = createMockContext()

    update(mockContext)
    expect(mockContext.status).toBe(404)
    expect(mockContext.throw).toBeCalledWith(404, 'Freelance ID is missing')
  })

  it('Cannot show a freelance without ID', () => {
    const mockContext = createMockContext()
    mockContext.params = { id: 'toto' }

    update(mockContext)
    expect(mockContext.status).toBe(404)
    expect(mockContext.throw).toBeCalledWith(404, 'Freelance ID toto is unknown')
  })

  it('Update a freelance', () => {
    const mockContext = createMockContext()
    mockContext.params = { id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b' }
    mockContext.request.body = { firstname: 'Jean', lastname: 'Bon' }

    update(mockContext)
    expect(mockContext.status).toBe(200)
    expect(mockContext.body).toEqual({
      avatar: {
        '256x256': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/256x256.png',
        '512x512': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/512x512.png',
        '64x64': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png',
      },
      birthDate: '1990-12-31',
      firstname: 'Jean',
      id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b',
      isVisible: false,
      language: 'KLINGON',
      lastname: 'Bon',
      retribution: 500,
    })
  })
})
