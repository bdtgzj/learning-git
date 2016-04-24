import java.io.IOException;
import java.io.Reader;
import java.util.List;


import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MybatisMapper {

    private final static String commandHit = "Please input one of parameters[select/selectByID [id]/insert/update/delete].";

    public static void main(String[] args) throws IOException {

        int arg1 = 1;

        if (args.length <= 0) {
            System.out.println(commandHit);
            return;
        }

        switch (args[0]) {
            case "select":
                select();
                break;
            case "selectByID":
                if (args.length > 1) arg1 = new Integer(args[1]);
                selectByID(arg1);
                break;
            case "insert":
                insert();
                break;
            case "update":
                if (args.length > 1) arg1 = new Integer(args[1]);
                update(arg1);
                break;
            case "delete":
                if (args.length > 1) arg1 = new Integer(args[1]);
                delete(arg1);
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
        session.getConfiguration().addMapper(StudentMapper.class);
        return session;
    }

    public static List<Student> select() throws IOException {
      SqlSession session = getSession();
      StudentMapper mapper = session.getMapper(StudentMapper.class);

      List<Student> students = mapper.getAll();
      for (Student student : students) {
          System.out.println(student.getId());
          System.out.println(student.getName());
          System.out.println(student.getBranch());
          System.out.println(student.getPercentage());
          System.out.println(student.getEmail());
          System.out.println(student.getPhone());
      }

      System.out.println("select successfully!");
      session.commit();
      session.close();
      return null;

    }

    public static void selectByID(int id) throws IOException {
        SqlSession session = getSession();
        StudentMapper mapper = session.getMapper(StudentMapper.class);

        Student student = mapper.getByID(id);

        if (student != null) {
            System.out.println(student.getId());
            System.out.println(student.getName());
            System.out.println(student.getBranch());
            System.out.println(student.getPercentage());
            System.out.println(student.getEmail());
            System.out.println(student.getPhone());
        }

        System.out.println("selectByID successfully!");
        session.commit();
        session.close();
    }

    public static int insert()  throws IOException {
        // Get a session
        SqlSession session = getSession();
        StudentMapper mapper = session.getMapper(StudentMapper.class);

        // Create a new sutdent object
        Student student = new Student("Mohammad1","It1", 81, 984803321, "Mohammad1@gmail.com");

        // Insert student data
        mapper.insert(student);
        System.out.println("record inserted successfully!");
        session.commit();
        session.close();
        return 0;
    }

    public static void update(int id) throws IOException {
        SqlSession session = getSession();
        StudentMapper mapper = session.getMapper(StudentMapper.class);

        Student student = (Student)mapper.getByID(id);
        student.setName("bdtgzj");
        student.setPhone(999999999);
        student.setEmail("bdtgzj@gmail.com");

        mapper.update(student);
        session.commit();
        //session.close();

        student = mapper.getByID(id);
        session.commit();
        session.close();

        System.out.println("update successfully!");
        System.out.println(student.toString());
    }

    public static void delete(int id) throws IOException {
        // Get a session
        SqlSession session = getSession();
        StudentMapper mapper = session.getMapper(StudentMapper.class);

        // Insert student data
        mapper.delete(id);
        System.out.println("record delete successfully!");
        session.commit();
        session.close();
    }

}