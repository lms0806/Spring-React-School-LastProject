package com.cos.book.model.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Integer>{
	Page<Post> findByTitleContains(String title, Pageable pageable);
	Page<Post> findByContentContains(String content, Pageable pageable);
	
	@Query(value="Select * from post where userId=?",  nativeQuery = true)
	Page<Post> findwriter(int id, Pageable pagealbe);
	
	@Query(value = "Select count(*) from post where userId = ?", nativeQuery = true)
	int countpost(int userId);
	
	@Modifying
	@Query(value="Delete from post where userId = ?", nativeQuery = true)
	int deletepost(int userId);
	
	@Modifying
	@Query(value="Update post set views = views + 1 where id = ?",  nativeQuery = true)
	int updateViews(int postId);
}
