package com.juan.garden.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.juan.garden.model.ChatMessage;

public interface ChatRepository extends JpaRepository <ChatMessage,Integer>{
    @Query("SELECT m FROM ChatMessage m WHERE m.senderId in (:sendId,:recId) AND m.recipientId in (:recId,:sendId)")
    List<ChatMessage> findAllByChat(@Param("sendId") String sendId,@Param("recId") String recdId );
    
}
