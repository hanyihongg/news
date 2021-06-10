import store from '../store/index.js'

export default function $http(options) {
	const {
		url,
		data
	} = options;
	console.log(store.state.userInfo)
	const dataObj = {
		user_id: store.state.userInfo._id || '5fc44c5ad505f70001e0c299',
		...data
	}
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then((res) => {
			if (res.result.code === 200) {
				reslove(res.result)
			} else {
				reject(res.result)
			}

		}).catch((err) => {
			reject(err)
		})
	})
}
