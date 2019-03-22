public class Test0_0 {

  public static void main(String[] args) {
    //write your code here
    String ret  = "6;??????;";
    String expected = "??????";
    String result = Code.printQuestionMarks(6);

    if (result.equals(expected)) {
      ret += result + ";pass," ;
    }
    else {
        ret += result + ";fail,";
    }

    System.out.print(ret);

  }
}