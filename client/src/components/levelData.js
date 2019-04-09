export const levelData = {
    "description": 
    [
	"The method printQuestionMarks should return a string made up of n question marks, where n is an int given as an argument. If n is negative, return an empty string should be returned.\n\nExamples:\nInput = 6, Output = \"??????\" \nInput = 0, Output = \"\"",
	"The method isNegative takes an int as an argument and returns a boolean. It should return true if the given int is negative, and false otherwise. \n\nExamples:\nInput = -3, Output = true \nInput = 5, Output = false",
	"The method lengthGreaterThan3 takes a String as an argument and returns a boolean. It should return true if the given String has more than 3 characters, meaning that its length is greater than 3. It should return false otherwise. \n\nExamples:\nInput = \“hello world\”, Output = true \nInput = \"Hi\", Output = false",
	"The method maxTwoInts takes two ints as arguments and returns the value of the larger argument. You may assume that the two given ints will not be equal to each other. \n\nExamples:\nInput = 1, 4, Output = 4 \nInput = 2, -5, Output = 2",
	"The method arraySum takes an array of ints and should return the sum of all the elements in the array.\n\nExamples:\nInput = [1,2,3], Output = 6\nInput = [2], Output = 2",
	"The method swapEnds takes an array of ints and modifies it by swapping the first and last elements in the array, returning the modified array. You may assume that the provided array will have a length of at least 1.\n\nExamples:\nInput = [1,2,3,4], Output = [4,2,3,1]\nInput = [3,8,10], Output = [10,8,3]",
	"The method lastDigit takes three ints as arguments and returns true if two or more of them have the same rightmost digit. If all three ints have different rightmost digits, return false instead. You may assume that the ints will be non-negative. Hint: the \"%\" sign is the mod operator, meaning it computes the remainder of the first number divided by the second.\n\nExamples:\nInput = 23, 19, 13, Output = true\nInput = 23, 19, 2, Output = false",
	"The method countXes takes a string and returns the number of times the character \'x\' appears in the string. Recall that the charAt(i) function returns the character in a string at position i.\n\nExamples:\nInput = \"xyz\", Output = 1\nInput = \"abcxx\", Output = 2",
	"The method withinRange takes three ints, called \"min\", \"max\", and \"x\", and returns true if \"x\" is between \"min\" and \"max\", inclusive. Otherwise, if \"x\" is not within the range from \"min\" to \"max\", the method should return false.\n\nExamples:\nInput = 1, 3, 2, Output = true\nInput = 2, 6, 6, Output = true\nInput = 1, 3, 4, Output = false ",
	"The method firstHalf takes a string and returns the first half of the string. Recall that calling substring(a, b) on a string returns the substring starting at index a and extending up to, but not including, index b. You may assume that the string will be of even length.\n\nExamples:\nInput = \"WooHoo\", Output = \"Woo\"\nInput =\"HelloThere\", Output = \"Hello\"\nInput = \"ab\", Output = \"a\"",
	"The method divisible5or3 takes an int and returns true if it is evenly divisible by 5 or 3. However, if the given int is divisible by BOTH 5 and 3, return false. If the number if divisible by neither 5 nor 3, also return false.\n\nExamples:\nInput = 9, Output = true\nInput = 15, Output = false\nInput = 25, Output = true\nInput = 1, Output = false"
    ], 

    "codeHead": 
    ["public class Level0_", "public class Level1_", "public class Level2_", "public class Level3_", "public class Level4_", "public class Level5_", "public class Level6_", "public class Level7_", "public class Level8_", "public class Level9_", "public class Level10_" 
    ],

    "className": [
	"Level0", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9", "Level10"
    ],

    "starterCode":
    [
	" {\n\n  // Debug the code in this method\n  public static String printQuestionMarks(int n) {\n    return \"?\";\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n    \n  }\n}", 
	" {\n\n  // Debug the code in this method\n  public static boolean isNegative(int n) {\n    if (n < 0) {\n      return true\n    }\n    return false;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static boolean lengthGreaterThan3(String s) {\n    if (s.length() > 3) {\n      return true\n    }\n    return false\n  }\n\n  public static void main(String[] args) {\n    \n  }\n}",
	" {\n\n  // Debug the code in this method\r\n  public static int maxTwoInts(int a, int b) {\n    if a > b {\n      return a\n    }\n    return b;\n  }\n\n  public static void main(String[] args) {\n    \n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static int arraySum(int[] a) {\n    int sum = 0;\n    for (int i = 0; i < a.length; i++) {\n      sum += a[i];\n    return sum;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static int[] swapEnds(int[] a) {\n    n = a.length;\n    first = a[0];\n    last = a[n - 1];\n\n    a[0] = last;\n    a[n - 1] = first;\n\n    return a;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static boolean lastDigit(int a, int b, int c) {\n    if (a % 10 = b % 10 || a % 10 = c % 10 || b % 10 = c % 10) {\n      return true;\n    }\n    return false;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static int countXes(String s) {\n    int xCount = 0;\n    for (int i = 0, i < s.length(), i++) {\n      if (s.charAt(i) == \'x\') {\n        xCount++;\n      }\n    }\n\n    return xCount;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static boolean withinRange(int min, int max, int x) {\n    if (x =< max \&\& x => min) {\n      return true;\n    }\n    return false;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static String firstHalf(String s) {\n    int half = s.length/2;\n    return s.substring(0, half);\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}",
	" {\n\n  // Debug the code in this method\n  public static boolean divisible5or3(int n) {\n    if (n % 5 == 0 || n % 3 == 0); {\n      if (n % 5 == 0 \&\& n % 3 == 0); {\n        return false;\n      }\n      else {\n        return true;\n      }\n    }\n    else {\n      return false;\n    }\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}"
    ],

    "methodName": 
    [
	"printQuestionMarks", "isNegative", "lengthGreaterThan3", "maxTwoInts", "arraySum", "swapEnds", "lastDigit", "countXes", "withinRange", "firstHalf", "divisible5or3"
    ],

    "numberOfTests": 
    [
	"4","4","5","4","4","4","6","6","6","6","6"
    ]
};
