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
import java.util.HashMap;
import java.util.Map;

@WebServlet("/data")
public class DataServlet extends HttpServlet {
  HashMap<String, String> comments;
  
  @Override
  public void init() {
    comments = new HashMap<String, String>();
    comments.put("Andre Battle", "Hi again! This is just a hardcoded, test commnent.");
  }
   
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String json = convertToJson(comments);
    response.setContentType("application/jsom;");
    response.getWriter().println(json);
  }


  private String convertToJson(HashMap<String, String> comments) {
    String json = "[";
    // String[] keys = comments.keySet().toArray(new String[comments.size()]);
    for (Map.Entry<String, String> entry: comments.entrySet()) {
      String name = entry.getKey();
      String comment = entry.getValue();
      json += "{\"name\": ";
      json +=  "\"" + name + "\", "; 
      json += "\"comment\": ";
      json +=  "\"" + comment + "\"}, "; 
    }
    json = json.substring(0, json.length() - 2);
    json += "]";
    return json;

  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String userName = request.getParameter("user-name");
    String userComment = request.getParameter("user-comment");
    comments.put(userName, userComment);
    response.sendRedirect("/index.html");
  }
}