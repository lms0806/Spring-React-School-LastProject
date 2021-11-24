package com.cos.book.web;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cos.book.model.post.PostRepository;
import com.cos.book.model.reply.ReplyRepository;
import com.cos.book.model.user.User;
import com.cos.book.model.user.UserRepository;
import com.cos.book.service.UserService;

import lombok.RequiredArgsConstructor;

/**
 * 회원정보, 회원수정 하지 않고 간단하게 구현!!
 * 그래서 Service 따로 안만들었음.
 */

@RequiredArgsConstructor
@RestController
public class UserController {

	private final UserService userService;
	private final UserRepository userRepository;
	private final PostRepository postRepository;
	private final ReplyRepository replyRepository;
	private final HttpSession session;
	
	// (1) 로그인 -  필터에 등록함.
	
	// (2) 회원가입
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody User person) {
		userRepository.save(person);
		return new ResponseEntity<String>("ok", HttpStatus.CREATED);
	}
	
	// (3) 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout() {
		session.invalidate();
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
	
	@GetMapping("/myinfo/postCount/{id}")
	public ResponseEntity<?> postCount(@PathVariable int id){
		User userEntity = userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
		System.out.println(userEntity);
		int postcount = postRepository.countpost(userEntity.getId());
		System.out.println(postcount);
		return new ResponseEntity<Integer>(postcount, HttpStatus.OK);
	}
	
	@GetMapping("/myinfo/replyCount/{id}")
	public ResponseEntity<?> replyCount(@PathVariable int id){
		User userEntity = userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
		System.out.println(userEntity);
		int replycount = replyRepository.countreply(userEntity.getId());
		System.out.println(replycount);
		return new ResponseEntity<Integer>(replycount, HttpStatus.OK);
	}
	
	@PostMapping("/searchid")
	public ResponseEntity<?> searchid(@RequestBody User person) {
		System.out.println("person : " + person);
		User userEntity = userRepository.findByEmail(person.getEmail());
		if(userEntity == null) {
			return  new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>(userEntity.getUsername(), HttpStatus.OK);
	}
	
	@PostMapping("/searchpassword")
	public ResponseEntity<?> searchpassword(@RequestBody User person) {
		System.out.println("person : " + person);
		User userEntity = userRepository.findByEmailAndUsername(person.getEmail(), person.getUsername());
		if(userEntity == null) {
			return  new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>(userEntity.getPassword(), HttpStatus.OK);
	}
	
	@PutMapping("/user/{id}")
	public ResponseEntity<?> update(@RequestBody User user, @PathVariable int id){
		int result = userService.정보수정(user, id);
		
		if(result == 1) {
			return new ResponseEntity<String>("ok", HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
		}
	}
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> delete(@PathVariable int id){
		System.out.println(id);
		int result = userService.회원탈퇴(id);
		
		if(result == 1) {
			return new ResponseEntity<String>("ok", HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
		}
	}
}
