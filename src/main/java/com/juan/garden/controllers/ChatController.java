package com.juan.garden.controllers;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.juan.garden.dto.ChatMessageDTO;
import com.juan.garden.model.ChatMessage;
import com.juan.garden.services.ChatService;

@Controller
/**
 * Controller for chat related services
 */
public class ChatController {
    @Autowired private SimpMessagingTemplate messagingTemplate;
    @Autowired private ChatService chatService;

    
    @MessageMapping("/chat")
    @RolesAllowed("USER")
    /**
     * Api method for messaging
     * @param chatMessage
     * Receives the chat message to be stored and send to the recipient
     * @return 
     * Returns the saved chat message to confirm the message was sent
     */
    public ChatMessage receiveMessage (@Payload ChatMessageDTO chatMessage){
        messagingTemplate.convertAndSendToUser(chatMessage.getRecipientId(), "/queue/messages", chatMessage, null, null);
        return chatService.save(chatMessage);
    }
    @RolesAllowed("ADMIN")
    @ResponseBody
    @RequestMapping(value = "/test",method = RequestMethod.GET)
    /**
     * 
     * @return
     */
    public String mockService (){
        return "Your text";
    }
    @RolesAllowed("ROLE_USER")
    @ResponseBody
    @RequestMapping(value = "/user",method = RequestMethod.GET)
    public String usermocke (){
        return "Your USER";
    }
}