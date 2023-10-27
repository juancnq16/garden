package com.juan.garden.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.juan.garden.model.User;
import com.juan.garden.services.UserService;

@Controller
@RequestMapping("/users")
/**
 * Controller for user related actions
 */
public class UserController {
    @Autowired private UserService userService;

    @RolesAllowed("USER")
    @ResponseBody
    @RequestMapping(value = "/search",method = RequestMethod.POST)
    public List<String> queryUser(@RequestBody String username){
        List<User> usersList = userService.queryUser(username);
        List<String> result = new ArrayList<>();
        for(User usr : usersList){
            result.add(usr.getUsername());
        } 
        return result;
    }
    @ResponseBody
    @RolesAllowed({"USER","ADMIN"})
    @RequestMapping(value = "/getFriendList",method = RequestMethod.GET)
    public List<String> getList(Authentication auth){
        List<String> contacts = userService.getContactList(auth.getName());
        return contacts;
    }
    @ResponseBody
    @RolesAllowed({"USER","ADMIN"})
    @RequestMapping(value = "/addFriend",method = RequestMethod.POST)
    public List<String> addFriend(Authentication auth, @RequestBody String friend){
        List<String> contacts = userService.addFriend(auth.getName(),friend);
        return contacts;
    }
}
