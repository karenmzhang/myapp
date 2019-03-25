public class Test1_0 {

  public static void main(String[] args) {
    //write your code here
    String ret  = "{1,2,3};6;";
    int expected = 6;
    int[] arr = {1,2,3};
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