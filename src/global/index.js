import { setupElementPlus } from '@/libs/elementPlus/index.js'
export const setupGlobal = (app) => {
	return {
		install: setupElementPlus(app)
	}
}