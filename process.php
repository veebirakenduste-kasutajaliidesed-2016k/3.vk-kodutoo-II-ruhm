<?php

	$errors = array();      // array to hold validation errors
	$data = array();      // array to pass back data

// validate the variables ======================================================
    // if any of these variables don't exist, add an error to our $errors array

    if (empty($_POST['name']))
        $errors['name'] = 'Name is required.';

    if (empty($_POST['email']))
        $errors['email'] = 'Email is required.';
	
	 if(!preg_match("/^[\._a-zA-Z0-9-]+@[\.a-zA-Z0-9-]+\.[a-z]{2,6}$/i", $_POST['email'])) 
		 $errors['email'] = 'Write an existing email';

    if (empty($_POST['kommentaar']))
        $errors['kommentaar'] = 'Comment is required.';
	

// return a response ===========================================================

    // if there are any errors in our errors array, return a success boolean of false
    if ( ! empty($errors)) {

        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {

        // if there are no errors process our form, then return a message

        // FORM PROCESSING
        // THIS CAN BE WHATEVER WE WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

        // show a message of success and provide a true success variable
		
        $data['success'] = true;
        $data['message'] = 'Success!';
        $data['name'] = $_POST['name'];
        $data['email'] = $_POST['email'];
        $data['kommentaar'] = $_POST['kommentaar'];

    }

    // return all our data to an AJAX call
    echo json_encode($data);