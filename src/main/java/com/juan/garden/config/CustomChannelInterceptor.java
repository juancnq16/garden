package com.juan.garden.config;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.access.AccessDeniedException;

import com.juan.garden.util.JwtUtil;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

public class CustomChannelInterceptor implements ChannelInterceptor {
    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        this.jwtUtil = new JwtUtil();
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            List<String> token = accessor.getNativeHeader("auth");
            boolean authenticated = false;
            for(String tk : token){
                if(jwtUtil.validateAccessToken(tk)){
                    authenticated = true;
                }
            }
            if(!authenticated) throw new AccessDeniedException("Bad token");
        }
        return message;
    }
}
