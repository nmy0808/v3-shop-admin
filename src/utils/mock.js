

const goodsImages = [
  'https://ecmb.bdimg.com/tam-ogel/2138734512_636097110_300_200.jpg',
  'https://ecmb.bdimg.com/tam-ogel/519917739_1170906296_367_252.jpg',
  'https://ecmb.bdimg.com/tam-ogel/-964735307_-1781726017_300_200.jpg',
  'https://ecmb.bdimg.com/tam-ogel/867045614_180174440_300_200.jpg',
  'https://ecmb.bdimg.com/tam-ogel/269555804_-1675491685_540_302.jpg',
  'https://ecmb.bdimg.com/tam-ogel/-839458814_1141758061_1920_1440.jpg'
]
const avatarImages = [
	'https://img2.baidu.com/it/u=4077598736,94614905&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=429',
	'https://img1.baidu.com/it/u=2182018132,305963531&fm=253&fmt=auto&app=138&f=JPEG?w=484&h=1024',
	'https://img0.baidu.com/it/u=4244212726,2686602880&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
	'https://img1.baidu.com/it/u=3688400740,2343300667&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
	'https://img0.baidu.com/it/u=3653957075,607253646&fm=253&fmt=auto&app=138&f=JPEG?w=367&h=500',
	'https://img0.baidu.com/it/u=1489193064,3952781528&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=500',
]
const titles = [
	"Redmi K50 至尊版",
	" Xiaomi 12S Ultra",
	"Xiaomi 12S Pro",
	"Redmi Note 11T Pro",
];
const names = ["nicole", "patton", "anthony", "venus"];


export function formatData(data){
	deepFind(data, 'url', goodsImages)
	deepFind(data, 'cover', goodsImages)
	deepFind(data, 'title', titles)
	deepFind(data, 'avatar', avatarImages)
	deepFind(data, 'nickname', names)
	deepFind(data, 'username', names)
}
function deepFind(obj, key, goodsImages) {
	const index = rangeRandom(0, goodsImages.length-1)
	const value = goodsImages[index]
	const keys = Object.keys(obj)
	keys.forEach(k => {
		const v = obj[k]
		if (typeof v === 'object' && !Array.isArray(obj) && v!==null) {
			deepFind(v, key, goodsImages)
		}
		if (Array.isArray(obj)&& v!==null) {
			for (let i = 0; i < obj.length; i++) {
				deepFind(obj[i], key, goodsImages)
			}
		}
		if (k === key) {
			obj[k] = value
		}
	})
}

function rangeRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}