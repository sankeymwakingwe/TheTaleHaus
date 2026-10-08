<?php
// Enquiry form: saves the enquiry and emails it to the studio.
require __DIR__ . '/_lib.php';

require_post();
$name    = field('name', 120);
$email   = field('email', 254);
$service = field('service', 120);
$message = field('message', 5000);

if ($name === '' || $message === '') respond(422, 'Please fill in your name and message.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(422, 'Please enter a valid email address.');
rate_limit('contact');

save_row('enquiries.csv', ['date' => date('c'), 'name' => $name, 'email' => $email, 'service' => $service, 'message' => $message]);
$sent = notify("New enquiry: $service — $name", "Name: $name\nEmail: $email\nService: $service\n\n$message\n", $email);

if (!$sent) respond(500, 'Sorry, your message could not be sent. Please email ' . SITE_EMAIL . ' directly.');
respond(200, 'Thanks! We’ll reply within two working days.');
