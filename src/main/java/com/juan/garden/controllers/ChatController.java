package com.juan.garden.controllers;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.juan.garden.model.ChatMessage;

@Controller
public class ChatController {
    /*
    @PostMapping
    @RolesAllowed("ROLE_EDITOR")
    public ResponseEntity<Product> create(@RequestBody @Valid Product product) {
        Product savedProduct = repo.save(product);
        URI productURI = URI.create("/products/" + savedProduct.getId());
        return ResponseEntity.created(productURI).body(savedProduct);
    }
    public ChatMessage sendMessage (@Payload ChatMessage chatMessage){
        return new ChatMessage();
    }
    */
    @Autowired private SimpMessagingTemplate messagingTemplate;
    
    @MessageMapping("/chat")
    public void receiveMessage (@Payload ChatMessage chatMessage){
        messagingTemplate.convertAndSendToUser(chatMessage.getRecipientId(), "/queue/messages", chatMessage, null, null);
    }
    @RolesAllowed("ADMIN")
    @ResponseBody
    @RequestMapping(value = "/test",method = RequestMethod.GET)
    public String mockService (){
        return "Your text";
    }
    @RolesAllowed("USER")
    @ResponseBody
    @RequestMapping(value = "/user",method = RequestMethod.GET)
    public String usermocke (){
        return "Your USER";
    }
}
/**
 * @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        var chatId = chatRoomService
                .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);
        chatMessage.setChatId(chatId.get());

        ChatMessage saved = chatMessageService.save(chatMessage);
        messagingTemplate.convertAndSendToUser(chatMessage.getRecipientId(),"/queue/messages",new ChatNotification(
                        saved.getId(),
                        saved.getSenderId(),
                        saved.getSenderName()));
    }
 */