<%@ page import="java.time.*" %>
<%@ page import="java.time.format.*" %>
<%@ page import="DatabaseConnections.Test" %>
<html>
<head>
<meta charset="UTF-8">
<title>Testing JSP Page</title>
</head>
<body bgcolor=white>

<table border="0">
<tr>
<td align=center>
<img src="images/tomcat.gif">
</td>
<td>
<h1>&#x1F389 &#x1F38A &#x1F389 &#x1F38A &#x1F389</h1>
<p><b>Conngggrraatttuuuulllaaattttiiiooonnnss!!!!!!</b> You are the proud recipient of <i>dynamic content</i>!! 
Don't believe me, huh? Well, check this out. Here's the current time:</p>
</td>
</tr>
</table>
<br>
<% DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
    LocalDateTime now = LocalDateTime.now();%>
    <%=now.toString().replace("T", "  ")%>
<p>(in GMT of course.....)</p>
<p>Alright, now here's an attempt to query our database...</p>
<%=Test.testMethod()%>
</body>
</html>
