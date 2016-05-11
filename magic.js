$(function() {

    // process the form
    $('form').submit(function(event) {

        // saame k2tte 'form' andmed
        var formData = {
            name: $('input[name=name]').val(), //'name'
            email: $('input[name=email]').val(), //'email'
            kommentaar: $('input[name=kommentaar]').val() //'kommentaar'
        };
			$.ajax({
			type        : 'POST', 
			url         : 'process.php', // the url where we want to POST
			data        : formData, // data object
			dataType    : 'json' // what type of data do we expect back from the server
		})
        // process the form
        .done(function(data) {
			
        console.log(data);	

        // here we will handle errors and validation messages
        if ( ! data.success) {
            
            // handle errors for name ---------------
            if (data.errors.name) {
                $('#name-group').addClass('has-error'); // add the error class to show red input
                $('#name-group').append('<div class="help-block">' + data.errors.name + '</div>'); // add the actual error message under our input
            }

            // handle errors for email ---------------
            if (data.errors.email) {
                $('#email-group').addClass('has-error'); // add the error class to show red input
                $('#email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
            }

            // handle errors for comment ---------------
            if (data.errors.kommentaar) {
                $('#comment-group').addClass('has-error'); // add the error class to show red input
                $('#comment-group').append('<div class="help-block">' + data.errors.kommentaar + '</div>'); // add the actual error message under our input
            }

        } else {
              // all is good
//            $('form').append('<div class="alert alert-success">' + data.message + '</div>');

            // after form submission redirection
           //  window.location = '/file'; // redirect a user to another page
            alert('success'); // for now we'll just alert the user
			
         //   data = JSON.stringify(localStorage.data);

				   $('form').append('<div class="alert alert-success">' + data['name'] + ' - ' + data['email'] + ' - ' +data['kommentaar']+'</div>');
			
               // $('#comment-group').append('<div class="help-block">' + data.success.kommentaar + '</div>');
        }

    });
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });
	
	

});