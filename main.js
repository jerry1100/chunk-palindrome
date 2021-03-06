// Process text on keypress
$('#textbox').on('keyup', function() {
    var word = $('#textbox').val().toUpperCase().replace(/ /g, ''); // case-insensitive, ignore white-space
    var chunk_size = 0; // number of chunks in string
    var stored_arr = []; // keep track of incomplete chunks
    var chunk_arr = []; // separate chunks for UI and visualization

    // Go through each letter (only up until midpoint)
    for (var i = 0;; i++) {
        var head = i;
        var tail = word.length-1-i;
        var head_char = word[head];
        var tail_char = word[tail];

        // Exit once the head and tail meet up
        if (head >= tail) {
            if (head === tail) { // combine incomplete chunks to form a single chunk
                stored_arr.splice(stored_arr.length/2, 0, head_char);
                chunk_arr.splice(chunk_arr.length/2, 0, stored_arr.join(''));
            } else {
                if (stored_arr.length !== 0) { // nothing to add
                    chunk_arr.splice(chunk_arr.length/2, 0, stored_arr.join(''));
                }
            }
            chunk_size  += 1;
            break;
        }

        // Compare letters
        if (stored_arr.length === 0) {
            if (head_char === tail_char) { // no chunks in progress so these are their own chunks
                chunk_size += 2;
                chunk_arr.splice(chunk_arr.length/2, 0, head_char, head_char);
            } else { // initialize a chunk in progress
                stored_arr.push(head_char, tail_char);
            }
        } else {
            stored_arr.splice(stored_arr.length/2, 0, head_char, tail_char);
            if (head_char !== tail_char) { // chunks are only possible on mismatched characters
                var is_chunk = true;
                var midpoint = stored_arr.length/2;
                for (var j = 0; j < midpoint; j++) { // test if chunk is valid
                    if (stored_arr[j] !== stored_arr[j+midpoint]) {
                        is_chunk = false;
                        break;
                    }
                }
                if (is_chunk) { // if chunk is complete, join with others
                    chunk_size += 2;
                    var stored_str = stored_arr.join('');
                    var head_str = stored_str.substr(0, stored_str.length/2);
                    var tail_str = stored_str.substr(stored_str.length/2, stored_str.length);
                    chunk_arr.splice(chunk_arr.length/2, 0, head_str, tail_str);
                    stored_arr = [];
                }
            }
        }
    }

    // Display chunks
	var chunk_count = chunk_arr.length;
    var html_str = '';
    for (var i = 0; i < chunk_count; i++) {
		var chunk_id = (i < chunk_count/2) ? i : chunk_count-i-1;
        html_str += '<div val="'+chunk_id+'" class="chunk_box">'+chunk_arr[i]+'</div>';
    }
	$('#chunk_count').html('Chunk Count: '+chunk_count);
	$('#display_chunks').html(html_str);
});

// Highlight groups on hover
$('#display_chunks').on('mouseover', '.chunk_box', function() {
	var chunk_id = $(this).attr('val');
	$('[val='+chunk_id+']').css('background-color', 'yellow');
});

// Remove highlight on exit
$('#display_chunks').on('mouseleave', '.chunk_box', function() {
	var chunk_id = $(this).attr('val');
	$('[val='+chunk_id+']').css('background-color', '');
});
