Welcome to Investorgator, a New Tool to Invest Like the Pros!

This document serves as a guide to the code which is included in this project.

To find front-end HTML, navigate to: Servlet/ROOT.  In that folder, each of the pages on our website, named accordingly, can be viewed.
Any Javascript functions called on the HTML pages can be found at Servlet/ROOT/js. The CSS style code can be found in ROOT/css.

Our website generates a JSON API from which we populate the tables and charts on the front end.  The code needed to implement that 
API, which derives from our implementation of Apache Tomcat on our AWS instance, can be found at Servlet/ROOT/WEB-INF/classes/DatabaseConnections.
Within that folder, also, can be found all of the files needed to connect the backend database to the front end API.
