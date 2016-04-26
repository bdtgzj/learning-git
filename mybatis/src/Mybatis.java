import java.io.IOException;
import java.io.Reader;
import java.util.List;


import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class Mybatis {

    private final static String commandHit = "Please input one of parameters[select/selectByID [id]/spSelectByID [id]/selectByNamePhoneEmail/insert/update/delete].";

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
            case "spSelectByID":
                if (args.length > 1) arg1 = new Integer(args[1]);
                spSelectByID(arg1);
                break;
            case "selectByNamePhoneEmail":
                //if (args.length > 1) arg1 = new Integer(args[1]);
                getByNamePhoneEmail();
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

      System.out.println("select successfully!");
      session.commit();
      session.close();
      return null;

    }

    public static void selectByID(int id) throws IOException {
        SqlSession session = getSession();
        Student student = session.selectOne("Student.getByID", id);

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

    public static void spSelectByID(int id) throws IOException {
        SqlSession session = getSession();
        Student student = session.selectOne("Student.callByID", id);

        if (student != null) {
            System.out.println(student.getId());
            System.out.println(student.getName());
            System.out.println(student.getBranch());
            System.out.println(student.getPercentage());
            System.out.println(student.getEmail());
            System.out.println(student.getPhone());
        }

        System.out.println("spSelectByID successfully!");
        session.commit();
        session.close();
    }

    public static void getByNamePhoneEmail() throws IOException {
        SqlSession session = getSession();

        Student student = new Student();
        student.setName("bdtgzj");
        student.setPhone(999999999);
        student.setEmail("bdtgzj@gmail.com");

        List<Student> students = session.selectList("Student.getByNamePhoneEmail", student);

        for (Student stu : students) {
            System.out.println(stu.getId());
            System.out.println(stu.getName());
            System.out.println(stu.getBranch());
            System.out.println(stu.getPercentage());
            System.out.println(stu.getEmail());
            System.out.println(stu.getPhone());
        }

        System.out.println("getByNamePhoneEmail successfully!");
        session.commit();
        session.close();
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

    public static void update(int id) throws IOException {
        SqlSession session = getSession();

        Student student = (Student)session.selectOne("Student.getByID", id);
        student.setName("bdtgzj");
        student.setPhone(999999999);
        student.setEmail("bdtgzj@gmail.com");

        session.update("Student.update", student);
        session.commit();
        //session.close();

        student = session.selectOne("Student.getByID", id);
        session.commit();
        session.close();

        System.out.println("update successfully!");
        System.out.println(student.toString());
    }

    public static void delete(int id) throws IOException {
        // Get a session
        SqlSession session = getSession();

        // Insert student data
        session.delete("Student.deleteByID", id);
        System.out.println("record delete successfully!");
        session.commit();
        session.close();
    }

}