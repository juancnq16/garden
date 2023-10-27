package com.juan.garden.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import com.juan.garden.dto.ChatMessageDTO;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
@Setter
/**
 * Entity for persisting messages
 */
public class ChatMessage {
   @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;
   private String senderId;
   private String recipientId;
   private String content;
   @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creationDate")
    private Date creationDate;
   /**
    * Builder to persist a dto
    * @param dto
    */
   public ChatMessage(ChatMessageDTO dto){
      this.content = dto.getContent();
      this.senderId = dto.getSenderId();
      this.recipientId = dto.getRecipientId();
   }
}