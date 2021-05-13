//add this to class path:
//.:/home/ec2-user/mariadb-java-client-2.7.2.jar
package DatabaseConnections;
import java.sql.*;  
import java.io.StringWriter;
import java.io.PrintWriter;

public class Test {
    public static String userName,password,url,driver;
    public static Connection con;
    public static Statement st;
    
     public static void main(String[] args){
         //System.out.println(Runtime.exec("echo $CLASSPATH"));
         System.out.println(testMethod());
     }

    public static String testMethod() {
        userName="root";
        password="SeniorProject21";
        url="jdbc:mariadb://localhost:3306/investorgator";
        driver="org.mariadb.jdbc.Driver";
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        String sStackTrace = "";
        try {
            Class.forName(driver);
        con=DriverManager.getConnection(url, userName, password);
        st=con.createStatement();
        ResultSet rs=st.executeQuery("select count(distinct cik_holding) from 2019Q4HoldingsData");  
        while(rs.next())  
            return "1"+rs.getInt(1);
        } catch (Exception e) {
          e.printStackTrace(pw);
          sStackTrace = sw.toString();
        }
        return sStackTrace;
    }

}

