public class Test0_0 {

  public static void main(String[] args) {
    //write your code here
    String ret  = "6;??????;";
    String expected = "??????";
    String result = Code.printQuestionMarks(6);
    char escape = 7;

    if (result.equals(expected)) {
      ret += result + ";pass" + Character.toString(escape);
    }
    else {
        ret += result + ";fail" + Character.toString(escape);
    }

    System.out.print(ret);

  }
}