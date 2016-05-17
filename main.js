// Process text on keypress
$('#textbox').on('keyup', function() {
    var word = $('#textbox').val().toUpperCase(); // get word, case-insensitive
    var chunk_size = 0; // store "chunks" or groups of matching characters
    var stored_arr = []; // mismatched letters, stored to check for groupings
    var group_arr = []; // store grouped letters for UI and visualization

    // Go through each letter (not actually going through everything)
    for (var i = 0; i < word.length; i++) {
        var head = i;
        var tail = word.length-1-i;
        var head_char = word[head];
        var tail_char = word[tail];

        // Exit once the head and tail meet up
        if (head >= tail) {
            if (head === tail) {
                if (stored_arr.length === 0) { // no mismatched characters, middle char is own chunk
                    group_arr.push(head_char);
                    chunk_size += 1;
                }
            } else { // mismatched characters form a single chunk
                stored_arr.splice(stored_arr.length/2, 0, head_char);
                group_arr.push(stored_arr.join(''));
                chunk_size  += 1;
            }
            break;
        }

        // Compare letters
        if (stored_arr.length === 0) {
            if (head_char === tail_char) { // no mismatched letters means valid chunks
                chunk_size += 2;
                group_arr.push(head_char);
            } else { // store unmatched head and tail
                stored_arr.push(head_char, tail_char);
            }
        } else {
            stored_arr.splice(stored_arr.length/2, 0, head_char, tail_char); // store in middle
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
                    group_arr.push(stored_arr.join('').substr(0, stored_arr.length/2));
                    stored_arr = [];
                }
            }
        }
    }
    console.log(chunk_size);
    console.log(group_arr);
    console.log('test');
});
