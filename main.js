// Process text on keypress
$('#textbox').on('keyup', function() {
    var word = $('#textbox').val();
    var chunk_size = 1; // minimum chunk size is 1
    var stored_arr = []; // mismatched letters, stored to check for groupings

    // Go through each letter (not actually going through everything)
    for (var i = 0; i < word.length; i++) {
        var head = i;
        var tail = word.length-1-i;

        // Exit once the head and tail meet up
        if (head >= tail) {
            break;
        }

        // Compare letters
        var head_char = word[head];
        var tail_char = word[tail];
        if (stored_arr.length === 0) { // no mismatched letters stored
            if (head_char === tail_char) {
                chunk_size += 2;
            } else {
                stored_arr.shift(head_char);
                stored_arr.push(tail_char);
            }
        } else {
            stored_arr.shift(head_char);
            stored_arr.push(tail_char);
            if (head_char !== tail_char) { // test for groups in stored letters
                var is_group = true;
                var midpoint = stored_arr.length/2;
                for (var j = 0; j < midpoint; j++) {
                    if (stored_arr[j] !== stored_arr[j+midpoint]) {
                        is_group = false;
                        break;
                    }
                }
                if (is_group) {
                    chunk_size += 2;
                    stored_arr = [];
                }
            }
        }
    }
    console.log(chunk_size);
});
