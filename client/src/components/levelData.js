export const levelData = {
    "description": 
    [
	"Instructions: The method printQuestionMarks should return a string made up of n question marks, where n is an int given as an argument. If n is negative, return an empty string should be returned.\n\nExamples:\nInput = 6, Output = \"??????\" \nInput = 0, Output = \"\"",
	"Instructions: The method isNegative takes an int as an argument and returns a boolean. It should return true if the given int is negative, and false otherwise. \n\nExamples:\nInput = -3, Output = true \nInput = 5, Output = false",
	"Instructions: The method lengthGreaterThan3 takes a String as an argument and returns a boolean. It should return true if the given String has more than 3 characters, meaning that its length is greater than 3. It should return false otherwise. \n\nExamples:\nInput = \“hello world\”, Output = true \nInput = \"Hi\", Output = false",
	"Instructions: The method maxTwoInts takes two ints as arguments and returns the value of the larger argument. You may assume that the two given ints will not be equal to each other. \n\nExamples:\nInput = 1, 4, Output = 4 \nInput = 2, -5, Output = 2",
	"Instructions: The method arraySum takes an array of ints and should return the sum of all the elements in the array.\n\nExamples:\nInput = [1,2,3], Output = 6\nInput = [2], Output = 2"
    ], 

    "codeHead": 
    ["public class Level0_", "public class Level1_", "public class Level2_", "public class Level3_", "public class Level4_"
    ],

    "className": [
	"Level0", "Level1", "Level2", "Level3", "Level4"
    ],

    "starterCode":
    [
	" {\n\n  // Debug the code in this method\n  public static String printQuestionMarks(int n) {\n    return \"?\";\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n    \n  }\n}", 
	" {\n\n  // Debug the code in this method\n  public static boolean isNegative(int n) {\n    if (n < 0) {\n      return true\n    }\n    return false;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static boolean lengthGreaterThan3(String s) {\n    if (s.length() > 3) {\n      return true\n    }\n    return false\n  }\n\n  public static void main(String[] args) {\n    \n  }\n}",
	" {\n\n  // Debug the code in this method\r\n  public static int maxTwoInts(int a, int b) {\n    if a > b {\n      return a\n    }\n    return b;\n  }\n\n  public static void main(String[] args) {\n    \n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static int arraySum(int[] arr) {\n    int sum = 0;\n    for (int i = 0; i < arr.length; i++) {\n      sum += arr[i];\n    return sum;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}"
    ],

    "methodName": 
    [
	"printQuestionMarks", "isNegative", "lengthGreaterThan3", "maxTwoInts", "arraySum"
    ],

    "numberOfTests": 
    [
	"4","4","5","4","4"
    ]
};
