<?php
// Enquiry form: saves the enquiry and emails it to ArchFams.
require __DIR__ . '/_lib.php';

require_post();
$name    = field('name', 120);
$phone   = field('phone', 40);
$email   = field('email', 254);
$service = field('service', 120);
$message = field('message', 5000);

if ($name === '' || $phone === '' || $message === '') respond(422, 'Please fill in your name, phone number and message.');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) respond(422, 'Please check your email address, or leave it empty.');
rate_limit('contact');

save_row('enquiries.csv', ['date' => date('c'), 'name' => $name, 'phone' => $phone, 'email' => $email, 'service' => $service, 'message' => $message]);
$sent = notify("New enquiry: $service — $name", "Name: $name\nPhone: $phone\nEmail: $email\nProject: $service\n\n$message\n", $email);

if (!$sent) respond(500, 'Sorry, your message could not be sent. Please WhatsApp us on +255 675 46 86 34.');
respond(200, 'Thank you. We will reply within one working day.');
