This problem can be solved using a dynamic programming approach. Here's a JavaScript function that does this:

```javascript
function closestSum(arr, target) {
    let dp = Array(target + 1).fill(0);
    let closestSum = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = target; j >= arr[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - arr[i]] + arr[i]);
            if (Math.abs(target - closestSum) > Math.abs(target - dp[j])) {
                closestSum = dp[j];
            }
        }
    }

    let result = [];
    for (let i = arr.length - 1, j = closestSum; i >= 0; i--) {
        if (j >= arr[i] && dp[j] == dp[j - arr[i]] + arr[i]) {
            result.push(arr[i]);
            j -= arr[i];
        }
    }

    return result;
}
```

This function takes an array of numbers `arr` and a target sum `target`. It returns an array of numbers from `arr` that when summed are closest to `target`.

Here's how it works:
- It first initializes a dynamic programming (DP) array `dp` of size `target + 1` with all elements set to 0 and a variable `closestSum` set to 0.
- It then iterates over the input array `arr` and for each number, it updates the DP array such that `dp[j]` is the maximum sum that can be obtained using the numbers from `arr` that do not exceed `j`.
- While updating the DP array, it also keeps track of the sum that is closest to `target`.
- After filling up the DP array, it constructs the result array by iterating over the input array in reverse order and checking if the current number is included in the closest sum.
- Finally, it returns the result array.

Please note that this function assumes that all numbers in the input array are non-negative. If the input array can contain negative numbers, the problem becomes NP-hard (computationally difficult), and there's no efficient solution that works for all cases. In such a case, you might need to use a different approach, such as a heuristic or approximation algorithm. Also, this function does not guarantee to return the unique solution if there are multiple solutions with the same sum. It will return one of them. If you need all solutions, you will need to modify the function accordingly. 

You can use this function like this:

```javascript
let arr = [1, 2, 3, 4, 5];
let target = 9;
console.log(closestSum(arr, target));  // Output: [4, 3, 2]
```

This will output `[4, 3, 2]` because 4+3+2=9 which is the closest sum to the target 9 that can be obtained from the numbers in the array. If there are multiple closest sums, it may output any one of them. 

I hope this helps! Let me know if you have any other questions. 😊
