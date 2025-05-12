package com.foro.publicaciones.repository;

import com.foro.publicaciones.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> { }
