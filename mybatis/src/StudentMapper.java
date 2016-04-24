import java.util.List;

import org.apache.ibatis.annotations.*;

public interface StudentMapper {

    final String getAll = "SELECT * FROM STUDENT";
    final String getByID = "SELECT * FROM STUDENT WHERE ID = #{id}";
    final String insert = "INSERT INTO STUDENT (NAME, BRANCH, PERCENTAGE, PHONE, EMAIL ) VALUES (#{name}, #{branch}, #{percentage}, #{phone}, #{email})";
    final String update = "UPDATE STUDENT SET EMAIL = #{email}, NAME = #{name}, BRANCH = #{branch}, PERCENTAGE = #{percentage}, PHONE = #{phone} WHERE ID = #{id}";
    final String deleteByID = "DELETE from STUDENT WHERE ID = #{id}";

    @Select(getAll)
    @Results(value = {
      @Result(property = "id", column = "ID"),
      @Result(property = "name", column = "NAME"),
      @Result(property = "branch", column = "BRANCH"),
      @Result(property = "percentage", column = "PERCENTAGE"),       
      @Result(property = "phone", column = "PHONE"),
      @Result(property = "email", column = "EMAIL")
    })
    List<Student> getAll();

    @Select(getByID)
    @Results(value = {
      @Result(property = "id", column = "ID"),
      @Result(property = "name", column = "NAME"),
      @Result(property = "branch", column = "BRANCH"),
      @Result(property = "percentage", column = "PERCENTAGE"),       
      @Result(property = "phone", column = "PHONE"),
      @Result(property = "email", column = "EMAIL")
    })
    Student getByID(int id);

    @Insert(insert)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Student student);

    @Update(update)
    void update(Student student);

    @Delete(deleteByID)
    void delete(int id);

}