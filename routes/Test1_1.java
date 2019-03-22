public class Test11 {

  public static void main(String[] args) {
    //write your code here
    String result = "";

    int[] case1 = {5};

    if (Code.arraySum(case1) != solutions[0]) {
      result += "fail";
    }
    else {result += "pass";}

    System.out.println(result);

  }
}