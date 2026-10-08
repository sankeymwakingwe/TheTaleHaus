<?php
// "Get Notified" newsletter signup: saves the email and notifies the studio.
require __DIR__ . '/_lib.php';

require_post();
$email = field('email', 254);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(422, 'Please enter a valid email address.');
rate_limit('subscribe');

save_row('subscribers.csv', ['date' => date('c'), 'email' => $email]);
notify('New newsletter signup', "New signup on thetale.haus:\n\n$email\n", $email);

respond(200, 'Thanks! You’re on the list.');
