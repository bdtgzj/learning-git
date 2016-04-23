import java.io.IOException;
import java.io.Reader;
import java.util.List;


import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class mybatisInsert {

    private final static String commandHit = "Please input one of parameters[select/insert/update/delete].";

    public static void main(String[] args) throws IOException {

        if (args.length <= 0) {
            System.out.println(commandHit);
            return;
        }

        switch (args[0]) {
            case "select":
                select();
                break;
            case "insert":
                insert();
                break;
            default:
                System.out.println(commandHit);
        }

    }

    public static SqlSession getSession() throws IOException {
        // Create a connection
        Reader reader = Resources.getResourceAsReader("./conf/SqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();
        return session;
    }

    public static List<Student> select() throws IOException {
      SqlSession session = getSession();
      List<Student> students = session.selectList("Student.getAll");
      for (Student student : students) {
          System.out.println(student.getId());
          System.out.println(student.getName());
          System.out.println(student.getBranch());
          System.out.println(student.getPercentage());
          System.out.println(student.getEmail());
          System.out.println(student.getPhone());
      }
      return null;
    }

    public static int insert()  throws IOException {
        // Get a session
        SqlSession session = getSession();

        // Create a new sutdent object
        Student student = new Student("Mohammad1","It1", 81, 984803321, "Mohammad1@gmail.com");

        // Insert student data
        session.insert("Student.insert", student);
        System.out.println("record inserted successfully!");
        session.commit();
        session.close();
        return 0;
    }

}