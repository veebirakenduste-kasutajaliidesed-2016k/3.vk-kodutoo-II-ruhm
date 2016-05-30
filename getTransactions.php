<?php

$transactions = file_get_contents( "transactions.txt" );

if ( $transactions == "" ) {
	echo json_encode( array() );
	die;
}

$transactions_array = explode( "\n", $transactions );
$ret = array();

if ( is_array( $transactions_array ) && ! empty( $transactions_array ) ) {
	foreach ( $transactions_array as $line ) {
		//Split CSV file by ; 0 => amount, 1 => date
		$line_elements = explode( ";", $line );

		if ( ! is_numeric( $line_elements[0] ) ) {
			continue;
		}

		$ret[] = array( "amount" => $line_elements[0], "date" => $line_elements[1] );
	}
} else {
	echo json_encode( array() );
	die;
}

echo json_encode( $ret );
die;