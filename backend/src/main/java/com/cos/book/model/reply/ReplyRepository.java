package com.cos.book.model.reply;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ReplyRepository extends JpaRepository<Reply, Integer>{
	
	@Modifying
	@Query(value="Insert into reply(userId, postId, content, createDate) values (?1, ?2, ?3, now())", nativeQuery = true)
	int mSave(int userId, int postId, String content); // 업데이트된 행의 개수를 리턴해줌
	
	@Query(value = "Select count(*) from reply where userId = ?", nativeQuery = true)
	int countreply(int userId);
	
	@Modifying
	@Query(value="Delete from reply where userId = ?", nativeQuery = true)
	int deletereply(int userId);
}
