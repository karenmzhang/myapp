export const levelData = {
    "description": ["Instructions: Return a string made up of N question marks, where N is an int given as an argument. If N is negative, return an empty string.\n\nExamples:\nInput = 6, Output = \"??????\" \nInput = 0, Output = \"\"", "Given an array of ints, return the sum of all the elements in the array.\n\nExamples:\nInput = [1,2,3], Output = 6\nInput = [2], Output = 2"], 
    "starterCode":["public class Code {\n  public static String printQuestionMarks(int n) {\n   //write your code here\n   return \"?\";\n  }\n\n  public static void main(String[] args) {\n    \n  }\n}", 
	"public class Code {\n  public static int arraySum(int[] arr) {\n    //write your code here\n    int sum = 0;\n    for (int i = 0; i < arr.length; i++) {\n      sum += arr[i];\n    return sum;\n  }\n\n  public static void main(String[] args) {\n\n  }\n}"],
    "methodName": ["printQuestionMarks","arraySum"]
};
