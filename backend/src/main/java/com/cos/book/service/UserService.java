package com.cos.book.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.book.model.post.PostRepository;
import com.cos.book.model.reply.ReplyRepository;
import com.cos.book.model.user.User;
import com.cos.book.model.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final PostRepository postRepository;
	private final ReplyRepository replyRepository;

	@Transactional(readOnly = true)
	public User 내정보(int id) {
		System.out.println("내정보 발동");
		System.out.print(userRepository.findById(id));
		return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(id + "는 존재하지 않습니다."));
	}
	
	@Transactional
	public int 정보수정(User user, int id) {
		User userEntity = userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));

		if(userEntity != null) {
			userEntity.setPassword(user.getPassword());
			return 1;
		}else {
			return 0;
		}
	}
	
	@Transactional
	public int 회원탈퇴(int id) {
		User userEntity = userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
		if(userEntity != null) {
			System.out.println("삭제진입");
			replyRepository.deletereply(userEntity.getId());
			postRepository.deletepost(userEntity.getId());
			userRepository.deleteById(userEntity.getId());
			System.out.println("삭제완료");
			return 1;
		}else {
			return 0;
		}
	}
}
