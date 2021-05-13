//add this to class path
//.:/home/ec2-user/mariadb-java-client-2.7.2.jar
package DatabaseConnections;
import java.sql.*;  
import java.io.StringWriter;
import java.io.PrintWriter;
import com.google.gson.*;
import java.util.*;
//import org.apache.commons.dbutils.*;
//import org.apache.commons.dbutils.handlers.*;
import java.io.*;

public class SQLSandbox {
    public static String userName,password,url,driver;
    public static Connection con;
    public static Statement st;
    
    public static void main(String[] args){
          executeCallMainStats("/home/ec2-user/Servlet/ROOT/WEB-INF/classes/DatabaseConnections/ciks.csv");
         // executeCallConsensusStats("/home/ec2-user/Servlet/ROOT/WEB-INF/classes/DatabaseConnections/cusips.csv");
    }

    public static String executeCallMainStats(String cikFile){
            String stackTrace = "";
            userName="root";
            password="SeniorProject21";
            url="jdbc:mariadb://localhost:3306/investorgator";
            driver="org.mariadb.jdbc.Driver";
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            try{
               Class.forName(driver);
               con=DriverManager.getConnection(url, userName, password);
               Scanner scanner = new Scanner(new File(cikFile));
               scanner.useDelimiter("\n");
              while (scanner.hasNext()) {
                  // CallableStatement cs =  con.prepareCall("{call calculateYoY(?)}");
                  CallableStatement cs2 =  con.prepareCall("{call calculateQoQ(?)}");
                  // cs.setString(1, scanner.next());
                  cs2.setString(1, scanner.next());
                  // cs.executeUpdate();
                  cs2.executeUpdate();
              }
            } catch (Exception e) {
               e.printStackTrace(pw);
               stackTrace = sw.toString();
               System.out.println(stackTrace);
            } finally {
                if (con != null) {
                    try {
                        con.close();
                    } catch (SQLException e) {
                        System.out.println(e);
                    }
                }
            }
            return stackTrace;
    }
    
        public static String executeCallConsensusStats(String cusipFile){
            String stackTrace = "";
            userName="root";
            password="SeniorProject21";
            url="jdbc:mariadb://localhost:3306/investorgator";
            driver="org.mariadb.jdbc.Driver";
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            try{
               Class.forName(driver);
               con=DriverManager.getConnection(url, userName, password);
               Scanner scanner = new Scanner(new File(cusipFile));
               scanner.useDelimiter("\n");
              while (scanner.hasNext()) {
                  // CallableStatement cs =  con.prepareCall("{call consensus_YoY(?)}");
                  CallableStatement cs2 =  con.prepareCall("{call consensus_QoQ(?)}");
                  // cs.setString(1, scanner.next());
                  cs2.setString(1, scanner.next());
                  // cs.executeUpdate();
                  cs2.executeUpdate();
              }
            } catch (Exception e) {
               e.printStackTrace(pw);
               stackTrace = sw.toString();
               System.out.println(stackTrace);
            } finally {
                if (con != null) {
                    try {
                        con.close();
                    } catch (SQLException e) {
                        System.out.println(e);
                    }
                }
            }
            return stackTrace;
    }
}