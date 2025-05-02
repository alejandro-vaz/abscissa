/*                                                                           */
/* RENDERING                                                                 */
/*                                                                           */

// RENDERING -> BUTTON
document.addEventListener("DOMContentLoaded", function() {
    PayPal.Donation.Button({
        env:'production',
        hosted_button_id:'FY3JEAXWWBE8U',
        image: {
            src:'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
            alt:'Donate with PayPal button',
            title:'PayPal - The safer, easier way to pay online!'
        }
    }).render('#donate-button');
})

/*
<div id="donate-button-container">
    <div id="donate-button"></div>
</div>
*/