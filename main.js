// Process text on keyup
$('#textbox').on('keyup', function() {
    var word = $('#textbox').val();
    var chunk_size = 0;
    var left_arr = [];
    var right_arr = [];

    // Go through each letter
    for (var i = 0; i < word.length; i++) {

        if (i === word.length-1-i) {
            chunk_size += 1;
            break;
        } else if (i > word.length-1-i) {
            break;
        }


        var left = word[i]; // start at first letter
        var right = word[word.length-1-i]; // start at last letter

        // Compare letters
        if (left === right) {
            if (!left_arr.length && !right_arr.length) { // both arrays empty
                chunk_size += 2;
            } else {
                left_arr.push(left);
                right_arr.push(right);
            }
        } else {
            left_arr.push(left);
            right_arr.push(right);
            if (left_arr.length || right_arr.length) {
                if (is_palindrome(left_arr, right_arr)) {
                    chunk_size += 2;
                    left_arr = [];
                    right_arr = [];
                }
            }
        }
    }

    if (chunk_size === 0) {
        chunk_size = 1;
    }
    console.log(chunk_size);

});

function is_palindrome(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}
