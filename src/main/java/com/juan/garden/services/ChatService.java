package com.juan.garden.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juan.garden.dto.ChatMessageDTO;
import com.juan.garden.model.ChatMessage;
import com.juan.garden.repositories.ChatRepository;
@Service
public class ChatService {
    @Autowired ChatRepository chatRepository;
    public ChatMessage save(ChatMessageDTO dto){
        return(chatRepository.save(new ChatMessage(dto)));
    }
}
