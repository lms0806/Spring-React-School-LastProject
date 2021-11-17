package com.cos.book.model.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	User findByUsernameAndPassword(String username, String password);
	
	User findByEmail(String email);
	
	User findByEmailAndUsername(String email, String username);
}
