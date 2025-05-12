package com.foro.publicaciones.service;

import com.foro.publicaciones.model.Post;
import com.foro.publicaciones.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id)
            .map(post -> {
                post.setTitle(updatedPost.getTitle());
                post.setContent(updatedPost.getContent());
                return postRepository.save(post);
            })
            .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
    }

    public void deletePost(Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
        } else {
            throw new RuntimeException("Publicación no encontrada con ID: " + id);
        }
    }
    
}
