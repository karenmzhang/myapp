public class Test0_2 {

  public static void main(String[] args) {
    //write your code here
    String ret  = "0;;";
    String expected = "";
    String result = Code.printQuestionMarks(0);
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