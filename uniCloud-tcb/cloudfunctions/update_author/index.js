'use strict';
const db=uniCloud.database();
const dbcmd= db.command;

exports.main = async (event, context) => {
	
	const{
		user_id,
		author_id
	}=event;
	
	const user= await db.collection('user').doc(user_id).get();
	const author_likes_ids=user.data[0].author_likes_ids;
	
	let author_ids= null
	
	if(author_likes_ids.includes(author_id)){
		author_ids=dbcmd.pull(author_id);
	}else{
		author_ids = dbcmd.addToSet(author_id);
	}
	
	await db.collection('user').doc(user_id).update({
		author_likes_ids:author_ids
	})
	
	//返回数据给客户端
	return {
		code:200,
		msg:'关注更新成功'
	}
};
