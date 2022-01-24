import KoaRouter from 'koa-router'
import { getLanguages, show, update } from './controllers/freelances'

const router = new KoaRouter()

router.get('/freelances/languages', getLanguages)
router.get('/freelances/:id', show)
router.put('/freelances/:id', update)

export default router
