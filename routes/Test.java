public class Test {

  public static void main(String[] args) {
    //write your code here
    String result = "";
    /*Array with negative numbers
    Length 1 array 
    Length 3 array
    Length 4 array
    */

    int[] case1 = {5};
    int[] case2 = {-3, 2, 5, -10};
    int[] case3 = {6, 12, 8};
    int[] case4 = {};
    int[] solutions = {5, -6, 26, 0};

    if (Code.arraySum(case1) != solutions[0]) {
      result += "fail\n";
    }
    else {result += "pass\n";}

    if (Code.arraySum(case2) != solutions[1]) {
      result += "fail\n";
    }
    else {result += "pass\n";}

    if (Code.arraySum(case3) != solutions[2]) {
      result += "fail\n";
    }
    else {result += "pass\n";}

    if (Code.arraySum(case4) != solutions[3]) {
      result += "fail\n";
    }
    else {result += "pass\n";}

    System.out.println(result);

  }
}