package com.foro.publicaciones.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String content;

    @Enumerated(EnumType.STRING)
    private Category category;

    public String getTitle() {
        return this.title;
    }
    public String getContent() {
        return this.content;
    }
    
}
