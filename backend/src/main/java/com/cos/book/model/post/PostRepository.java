package com.cos.book.model.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Integer>{
	Page<Post> findByTitleContains(String title, Pageable pageable);
	
	@Modifying
	@Query(value="Delete from post where userId = ?", nativeQuery = true)
	int deletepost(int userId);
}
