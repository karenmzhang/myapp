public class Test1_1 {
  /* Length 1 array  [2] = 2
Length 3 array [1,2,3] = 6
Length 4 array [5,-1,11,-7] = 8
Length 0 array [] = 0
Length 3 array [0,0,0] = 0  
Length 4 array [-1,-2,-3,-4] = -10
Length 5 array [0,6,11,0,2] = 19 */

  public static void main(String[] args) {
    //write your code here
    String ret  = "{2};2;";
    int expected = 2;
    int[] arr = {2};
    int result = Code.arraySum(arr);
    char escape = 7;

    if (result == expected) {
      ret += result + ";pass" + Character.toString(escape);
    }
    else {
        ret += result + ";fail" + Character.toString(escape);
    }

    System.out.print(ret);

  }
}


