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


public class Test {
    public static String userName,password,url,driver;
    public static Connection con;
    public static Statement st;
    
     public static void main(String[] args){
         //System.out.println(Runtime.exec("echo $CLASSPATH"));
        executeCall("/home/ec2-user/Servlet/ROOT/WEB-INF/classes/DatabaseConnections/ciks.csv");
     }

/*
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
        /*st=con.createStatement();
        ResultSet rs=st.executeQuery("select * from 2019Q4HoldingsData where nameOfIssuer=='nameOfIssuer'");  
        return resultSetToJson(rs);*/
        
        /*
        resultSetToJson(con,"select * from InvestorgatorData where cik=1000275");
        } catch (Exception e) {
          e.printStackTrace(pw);
          sStackTrace = sw.toString();
        }
        long timeNow = System.currentTimeMillis();
        //String dummy = resultSetToJson(con,"select * from 2019Q4HoldingsData where nameOfIssuer='ALPHABET INC'");
        //String dummy = resultSetToJson(con,"select * from 2019Q4HoldingsData where nameOfIssuer='CANADIAN PAC RY LTD'");
        return null;
    }
//select * from 2019Q4HoldingsData where nameOfIssuer=='nameOfIssuer'


public static void resultSetToJson(Connection connection, String query) {
        List<Map<String, Object>> listOfMaps = null;
        try {
            QueryRunner queryRunner = new QueryRunner();
            listOfMaps = queryRunner.query(connection, query, new MapListHandler());
          FileWriter writer = new FileWriter("issuerSample.json");
          writer.write("{\"success\":true,\"data\":");
            new Gson().toJson(listOfMaps,writer );
            writer.write("}");
            writer.flush();
        } catch (Exception se) {
            System.out.println(se);
            throw new RuntimeException("Couldn't query the database.", se);
        } finally {
          //  DbUtils.closeQuietly(connection);
        }
    
}

*/
    public static String executeCall(String cikFile){
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
               scanner.useDelimiter(",");
               while (scanner.hasNext()) {
                   System.out.println(scanner.next());
                   /* CallableStatement cs =  con.prepareCall("{call calculateYoY(" + scanner.next() +")}");
                   CallableStatement cs2 =  con.prepareCall("{call calculateQoQ(" + scanner.next() +")}");
                   cs.execute();
                   cs2.execute(); */
               }
            } catch (Exception e) {
               e.printStackTrace(pw);
               stackTrace = sw.toString();
            }
            return stackTrace;
    }

}