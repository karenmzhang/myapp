public class Test0_2 {

  public static void main(String[] args) {
    //write your code here
    String ret  = "0;;";
    String expected = "";
    String result = Code.printQuestionMarks(0);

    if (result.equals(expected)) {
      ret += result + ";pass," ;
    }
    else {
        ret += result + ";fail,";
    }

    System.out.print(ret);

  }
}