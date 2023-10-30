package com.juan.garden.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juan.garden.model.User;
import com.juan.garden.repositories.UserRepository;

@Service
public class UserService {
    @Autowired UserRepository userRepository;
    public List<User> queryUser(String username){
        return userRepository.findByUsernameContaining(username);
    }
    public List<String> getContactList(String username){
        User usr = userRepository.findByUsername(username);
        List<String> list = new LinkedList<String>(Arrays.asList(usr.getContactList().split(";")));
        list.remove(0);
        return list;
    }
    public List<String> addFriend(String user, String friend){
        User usr = userRepository.findByUsername(user);
        if(!usr.getContactList().contains(friend)){            
            usr.setContactList(usr.getContactList()+";"+friend);
            userRepository.save(usr);
            User friendUser = userRepository.findByUsername(friend);
            friendUser.setContactList(friendUser.getContactList()+";"+usr.getUsername());
            userRepository.save(friendUser);
        }
        List<String> list = new LinkedList<String>(Arrays.asList(usr.getContactList().split(";")));
        list.remove(0);
        return list;
    }
}
