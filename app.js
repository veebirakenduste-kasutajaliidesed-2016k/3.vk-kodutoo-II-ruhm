$( document ).ready(function() {
    //Initialize exchange button click handler
    $("#ratesButton").on("click", function(e) {
        e.preventDefault();

        var rates = getExchangeRates();

        $(".exchange-rates").empty().append( getExchangeRatesHTML( rates ) );
        $(".currency-input").off();
        $(".currency-input").on("click", function(e) {
            $(".currency-input").not(this).prop("checked", false);
        });
    });

    //Bank button onclick handler
    $(".bank button").on("click", function(e) {
        var bankInput = $(".bank input");
        var messageContainer = $("#message");

        if ( bankInput.val() == "" ) {
            messageContainer.text("Please input a number to deposit money...");
            return;
        } else if ( ! $.isNumeric( bankInput.val() ) ) {
            messageContainer.text("You need to input a number...");
            return;
        } else if ( ! $(".exchange-rates div").length ) { //if no exchange rates are found
            messageContainer.text("You need to fetch exchange rates..");
            return;
        } else if ( ! $(".currency-input:checked").length ) { //You need to check a currency to transfer funds from
            messageContainer.text("You need to check a currency to transfer funds from...");
            return;
        } else {
            messageContainer.text("");
        }

        var currencyRate = $(".currency-input:checked").parent().find(".rate").text();

        var amount = bankInput.val() / currencyRate;

        $.ajax({
            method: "POST",
            url: "depositer.php",
            async: false,
            data: {
                amount: amount
            }
        })
        .done(function( data ) {
            messageContainer.text("Amount deposited...");
            getTransactions();
        });
    });

    //Get transactions button handler
    $("#getTransactionsButton").on("click", function(e) {
        e.preventDefault();

        getTransactions();
    });
});

function getTransactions() {
    //Get bank transactions...
    $.ajax({
        method: "GET",
        url: "getTransactions.php",
        async: false,
        data: {  }
    })
        .done(function( data ) {
            console.log( "transactinos...");
            var responseData = $.parseJSON( data );

            var transactionContainer = $(".transaction-container");
            transactionContainer.empty();

            var totalAmount = 0;
            var arrayLength = responseData.length;
            for (var i = 0; i < arrayLength; i++) {
                var cur = responseData[i];
                totalAmount = totalAmount + parseFloat( cur.amount );
                transactionContainer.append( getTransactionBlockHTML( cur.amount, cur.date ) );
            }

            transactionContainer.prepend( getTransactionTotalHTML( totalAmount ) );
        });
}

function getTransactionTotalHTML( total ) {
    return '<p id="total-balance">TOTAL BALANCE: ' + total + ' €</p>'
}

function getTransactionBlockHTML( amount, date ) {
    return      '<div class="transaction-block">'
            +   '<div class="amount">' + amount + ' €</div>'
            +   '<div class="date">' + date + '</div>'
            +   '</div>';
}

function getExchangeRatesHTML( rates ) {

    var ret = '<p class="base">'
            + 'BASE: ' + rates.base +
            + '</p>'
            + '<p class="date">'
            + 'DATE: ' + rates.date +
            + '</p>';

    for (var key in rates.rates) {
        var obj = rates.rates[key];
        ret +=      '<div class="block">'
                +   '<p class="currency">' + key + '</p>'
                +   '<p class="rate">' + obj + '</p>'
                +   '<input class="currency-input" type="checkbox"/>'
                +   '</div>';
    }


    return ret;
}

function getExchangeRates() {
    var ret;

    $.ajax({
        method: "GET",
        url: "http://api.fixer.io/latest",
        async: false,
        data: {  }
    })
    .done(function( data ) {
        ret = data;
    });

    return ret;
}