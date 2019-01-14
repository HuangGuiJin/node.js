//引入mongo的方法
const {
	MongoClient,
	ObjectId
} = require('mongodb');
//连接路径
const url = "mongodb://localhost:27017";
//连接数据库名
const dbName = "1810";


// 使用connect方法连接到服务器
let connect = () => {
	return new Promise((resolve, reject) => {
		// （ MongoClient作为官方的默认连接类，其继承了mongo）
		MongoClient.connect(url, (err, client) => {
			//错误信息
			if (err) {
				reject(err)
			} else {
				//成功信息
				console.log("Connected successfully to server");
				const db = client.db(dbName);
				resolve({
					db,
					client
				})
			}
		});
	})
}

// 查询语句
let find = (col, obj) => {
	return new Promise(async (resolve, reject) => {
		let {
			db,
			client
		} = await connect();
		const collection = db.collection(col);
		collection.find({
			...obj
		}).toArray(function(err, docs) {
			if (err) {
				reject(err)
			} else {
				resolve(docs);
				client.close();
			}
		});
	})
}

//插入
let insert = (col, arr) => {
	return new Promise(async (resolve, reject) => {
		let {
			db,
			client
		} = await connect();
		//找到集合里面的表col
		const collection = db.collection(col);
		// 表里插入数据
		collection.insertMany(arr, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result);
				client.close();
			}
		})
	})
}

//修改
let updata = (col,obje,obj) => {
	return new Promise(async (resolve, reject) => {
		let {
			db,
			client
		} = await connect();
		//找到集合里面的表col
		const collection = db.collection(col);
		// 表里插入数据
		collection.updateOne({
			...obje
		}, {
			$set: {
				...obj
			}
		}, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result);
				client.close();
			}
		})
	})
}

//删除
let deleted = (col,obj) => {
	return new Promise(async (resolve, reject) => {
		let {
			db,
			client
		} = await connect();
		const collection = db.collection(col);
		collection.deleteMany({
			...obj
		},(err, result)=>{
			if (err) {
				reject(err)
			} else {
				resolve(result);
				client.close();
			}
		});
	})
}





module.exports = {
	connect,
	ObjectId,
	find,
	insert,
	deleted,
	updata

}
