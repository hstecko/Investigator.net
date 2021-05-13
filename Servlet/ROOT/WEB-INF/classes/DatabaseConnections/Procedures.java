package DatabaseConnections;

import java.sql.*;  
import java.io.*;
import java.util.*;
import com.google.gson.*;
import org.apache.commons.dbutils.*;
import org.apache.commons.dbutils.handlers.*;

public class Procedures {
    public static Connection con;
    public static Statement st;
    
    public static final String USERNAME="root";
    public static final String PASSWORD="SeniorProject21";
    public static final String URL="jdbc:mariadb://localhost:3306/investorgator";
    public static final String DRIVER="org.mariadb.jdbc.Driver";
    public static StringWriter sw = new StringWriter();
    public static PrintWriter pw = new PrintWriter(sw);
    
        
     public static void main(String[] args){
        searchInfoInstitution();
     }
     
     
     
     public static String createJson(String query){
        String stackTrace = "";
        try{
            Class.forName(DRIVER);
            con=DriverManager.getConnection(URL, USERNAME, PASSWORD);
            CallableStatement cs =  con.prepareCall(query);
            boolean isResultSet = cs.execute();
            String json = new String();
            json = "{";
            while(isResultSet) {
                ResultSet resultSet = cs.getResultSet();
                ResultSetMetaData rsmd = resultSet.getMetaData();
                String table = "";
                String colName = rsmd.getColumnLabel(1);
                json += "\"" + colName + "\" : ";
                
                while(resultSet.next()) {
                    int numCols = rsmd.getColumnCount();
                    String row = (numCols!=1) ? "[":"";
                    for (int i=1; i<numCols & numCols!=1; i++)
                        row +=  "\"" +resultSet.getString(i) + "\", ";
                    row +=  "\"" +resultSet.getString(numCols) + "\"";
                    row += (numCols!=1) ? "]":"";
                    table += row + ", ";
                }
                table = table.substring(0, table.length() - 2);
                int rowCount = resultSet.getRow() -1;
                json += (rowCount!=1)? "[" + table + "],\n" : table+",\n";
                isResultSet = cs.getMoreResults();
            }
            json = json.substring(0, json.length() - 2);
            json += "}";
            json = json.replaceAll("E-7","");
            json = json.replaceAll("null","-");
            return json;
        } catch (Exception e) {
            e.printStackTrace(pw);
            stackTrace = sw.toString();
        }
        return stackTrace;
     }
     
     
    public static void saveJson(String fileName, String query) {
        List<Map<String, Object>> listOfMaps = null;
        try {
            Class.forName(DRIVER);
            con=DriverManager.getConnection(URL, USERNAME, PASSWORD);
            QueryRunner queryRunner = new QueryRunner();
            listOfMaps = queryRunner.query(con, query, new MapListHandler());
          FileWriter writer = new FileWriter(fileName+".js");
          writer.write("let suggestions = ");
            new Gson().toJson(listOfMaps,writer );
         //   writer.write("}");
            writer.flush();
        } catch (Exception se) {
            System.out.println(se);
            throw new RuntimeException("Couldn't query the database.", se);
        } finally {
         //   DbUtils.closeQuietly(connection);
        }
    
    }



    public static String company(String identifier, String year, String quarter) {
        String query = "{call company(\"" + identifier + "\"," + year + "," + quarter + ")}";
        String json = createJson(query);
        return json;
    }
    
    
    public static String institution(String identifier, String year, String quarter) {
        String query = "{call institution(\"" + identifier + "\"," + year + "," + quarter + ")}";
        String json = createJson(query);
        return json;
    }
    
    public static String consensus(String year, String quarter) {
        String query = "{call consensus(" + year + "," + quarter + ")}";
        String json = createJson(query);
        return json;
    }
    
    
    public static String searchInfoCompany(String year, String quarter) {
        String query = "{call consensus(" + year + "," + quarter + ")}";
        String json = createJson(query);
        return json;
    }
    
    public static void searchInfoInstitution() {
        String query = "{call companySearchInfo()}";
        String query2 = "{call institutionSearchInfo()}";
        saveJson("companySearchInfo",query);
        saveJson("institutionSearchInfo",query2);
    }
    


}