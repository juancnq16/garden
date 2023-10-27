package com.juan.garden.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
/**
 * DTO Class for receiving messages in api
 */
public class ChatMessageDTO {
    
   private String senderId;
   private String recipientId;
   private String content;
}
