package DatabaseConnections;

import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServlet;
import java.io.*;
import java.util.*;




public final class Api extends HttpServlet{
    
    public void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("application/json");
        final PrintWriter out = response.getWriter();
        String apiField = sanitize(request.getParameter("page"));
        switch(apiField){
            case "company":
                out.println(Procedures.company(sanitize(request.getParameter("identifier")), sanitize(request.getParameter("year")),sanitize(request.getParameter("quarter"))));
                break;
            case "institution":
                out.println(Procedures.institution(sanitize(request.getParameter("identifier")), sanitize(request.getParameter("year")),sanitize(request.getParameter("quarter"))));
                break;
            case "consensus":
                out.println(Procedures.consensus(sanitize(request.getParameter("year")),sanitize(request.getParameter("quarter"))));
                break;
        }
        out.flush();
    }
    

  
  
  public static String inputStreamToString(InputStream inputStream) throws IOException {
    ByteArrayOutputStream into = new ByteArrayOutputStream();
    byte[] buf = new byte[4096];
    for (int n; 0 < (n = inputStream.read(buf));)
        into.write(buf, 0, n);
    into.close();
    return new String(into.toByteArray(), "UTF-8");
  }
  
  public static String sanitize(String unsanitized){
    return unsanitized.replaceAll("[^-0-9a-zA-Z _:.,]", "");
  }

 
  public static void main(String[] args){
    
  }
  


}





