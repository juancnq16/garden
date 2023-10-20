package com.juan.garden.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

//@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@Entity
@Getter
@Setter
public class ChatMessage {
   /*
   @Id
   private String id;
   private String chatId;
   private String senderName;
   private String recipientName;
   private Date timestamp;
   private MessageStatus status;
    */
   private String senderId;
   private String recipientId;
   private String content;
}