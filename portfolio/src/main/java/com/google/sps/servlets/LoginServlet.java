// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;



@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
  private class LoginInfo {
    Boolean signedIn;
    String url;
    String titleText;
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    LoginInfo currentStatus = new LoginInfo();

    if (userService.isUserLoggedIn()) {
      response.setContentType("text/plain;charset=UTF-8");
      String urlToRedirectToAfterUserLogsOut = "/";
      String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);
      currentStatus.signedIn = true;
      currentStatus.url = logoutUrl;
      currentStatus.titleText = "Logout Here";

    } else {
      response.setContentType("text/html");
      String urlToRedirectToAfterUserLogsIn = "/";
      String loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);
      currentStatus.signedIn = false;
      currentStatus.url = loginUrl;
      currentStatus.titleText = "Login Here";
    }
    Gson gson = new Gson();
    response.getWriter().println(gson.toJson(currentStatus));
  }
}
