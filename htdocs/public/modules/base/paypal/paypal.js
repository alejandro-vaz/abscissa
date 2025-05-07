/*                                                                           */
/* RENDERING                                                                 */
/*                                                                           */

// RENDERING -> DONATIONS
function addDonations(place) {
    container = document.createElement('div');
    container.id = 'donate-button-container';
    button = document.createElement('div');
    button.id = 'donate-button';
    container.appendChild(button);
    place.appendChild(container);
    PayPal.Donation.Button({
        env:'production',
        hosted_button_id:'FY3JEAXWWBE8U',
        image: {
            src:'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
            alt:'Donate with PayPal button',
            title:'PayPal - The safer, easier way to pay online!'
        }
    }).render('#donate-button');
}