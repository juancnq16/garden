import { RxStompConfig } from "@stomp/rx-stomp";
import { StompService } from "../services/stomp.service";
import { stompConfig } from "./stomp-config";


export function rxStompServiceFactory() {
  const rxStomp = new StompService();
  var customConfig:RxStompConfig = stompConfig;
  customConfig.connectHeaders = {
    auth:window.sessionStorage.getItem('token')+"",
    login: 'guest',
    passcode: 'guest',
  }
  rxStomp.configure(customConfig);
  rxStomp.activate();
  return rxStomp;
}