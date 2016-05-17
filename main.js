// Process text on keypress
$('#textbox').on('keyup', function() {
    var word = $('#textbox').val().toUpperCase(); // get word, case-insensitive
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
        if (stored_arr.length === 0) {
            if (head_char === tail_char) { // no mismatched letters means valid chunks
                chunk_size += 2;
            } else { // insert mismatched head to beginning, tail to end
                stored_arr.unshift(head_char);
                stored_arr.push(tail_char);
            }
        } else {
            stored_arr.unshift(head_char);
            stored_arr.push(tail_char);
            if (head_char !== tail_char) { // groups possible only for mismatched chars
                var is_group = true;
                var midpoint = stored_arr.length/2;
                for (var j = 0; j < midpoint; j++) { // test for groups
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
