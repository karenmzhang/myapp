public class Test0_3 {

  public static void main(String[] args) {
    //write your code here
    String ret  = "-1;;";
    String expected = "";
    String result = Code.printQuestionMarks(-1);

    if (result.equals(expected)) {
      ret += result + ";pass," ;
    }
    else {
        ret += result + ";fail,";
    }

    System.out.print(ret);

  }
}