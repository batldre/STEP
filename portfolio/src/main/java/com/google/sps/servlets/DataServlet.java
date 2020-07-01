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

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  ArrayList<String> messages;
  
  @Override
  public void init() {
    messages = new ArrayList<String>();
    messages.add("Hello, my name is Andre!");
    messages.add("I would ask you your name, but I dont have user input yet!");
    messages.add("This is a hardcoded message.");
    messages.add("Eventually I will have real comments to show.");
    messages.add("I'm running out of message ideas so I will stop.");
  }
   
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String json = convertToJson(messages);
    response.setContentType("application/jsom;");
    response.getWriter().println(json);
  }

  private String convertToJson(ArrayList messages) {
    String json = "[";
    for (int i = 0; i < 5; i++) {
       json += "\"" + messages.get(i) + "\", "; 
    }
    json = json.substring(0,json.length() - 2);
    json += "]";
    return json;
  }
}
