package com.cos.book.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.book.model.post.Post;
import com.cos.book.model.post.PostRepository;
import com.cos.book.model.reply.Reply;
import com.cos.book.model.reply.ReplyRepository;
import com.cos.book.model.reply.dto.ReplySaveRequestDto;
import com.cos.book.model.user.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostService {

	private final PostRepository postRepository;
	private final ReplyRepository replyRepository;
	
	@Transactional
	public void 글쓰기(Post post, User principal) {
		post.setUser(principal);
		postRepository.save(post);
	}
	
	@Transactional(readOnly = true)
	public Page<Post> 글목록(Pageable pageable) {
		return postRepository.findAll(pageable);
	}
	
	@Transactional(readOnly = true)
	public Page<Post> 검색(Pageable pageable, String keyword){
		return postRepository.findByTitleContains(keyword, pageable);
	}
	
	@Transactional(readOnly = true)
	public Post 글상세(int id) {
		return postRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
	}
	
	@Transactional
	public int 글수정(Post post, int id, User principal) {
		Post postEntity = postRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
		
		if(postEntity.getUser().getId() == principal.getId()) {
			postEntity.setTitle(post.getTitle());
			postEntity.setContent(post.getContent());
			return 1;
		}else {
			return 0;
		}
	}
	
	@Transactional
	public int 글삭제(int id, User principal) {
		// 동일인 체크
		Post postEntity = postRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
		if(postEntity.getUser().getId() == principal.getId()) {
			postRepository.deleteById(id);
			return 1;
		}else {
			return 0;
		}
	}
	
	@Transactional
	public int 댓글쓰기(User principal, ReplySaveRequestDto replySaveRequestDto) {
		System.out.println(replySaveRequestDto.getUserId() + " " + principal.getId());
		if(replySaveRequestDto.getUserId() == principal.getId()) {
			replyRepository.mSave(replySaveRequestDto.getUserId(), replySaveRequestDto.getPostId(), replySaveRequestDto.getContent());
			return 1;
		}
		else {
			return 0;
		}
	}
	
	@Transactional
	public int 댓글삭제(int id, User principal) {
		Reply replyEntity = replyRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
		if(replyEntity.getUser().getId() == principal.getId()) {
			replyRepository.deleteById(id);
			return 1;
		}else {
			return 0;
		}
	}
}
