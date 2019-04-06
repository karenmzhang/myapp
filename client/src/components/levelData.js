export const levelData = {
    "description": ["Instructions: The method printQuestionMarks should return a string made up of n question marks, where n is an int given as an argument. If n is negative, return an empty string should be returned.\n\nExamples:\nInput = 6, Output = \"??????\" \nInput = 0, Output = \"\"", "The method arraySum takes an array of ints and should return the sum of all the elements in the array.\n\nExamples:\nInput = [1,2,3], Output = 6\nInput = [2], Output = 2"], 
    "codeHead" : ["public class Level0_", "public class Level1_"],
    "className" : ["Level0", "Level1"],
    "starterCode":[" {\n\n  // Debug the code in this method\n  public static String printQuestionMarks(int n) {\n    return \"?\";\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n    \n  }\n}", 
	" {\n\n  // Debug the code in this method\n  public static int arraySum(int[] arr) {\n    int sum = 0;\n    for (int i = 0; i < arr.length; i++) {\n      sum += arr[i];\n    return sum;\n  }\n\n  // You can use the main method to test your code\n  public static void main(String[] args) {\n\n  }\n}"],
    "methodName": ["printQuestionMarks","arraySum"],
    "numberOfTests": ["4","7"]
};
