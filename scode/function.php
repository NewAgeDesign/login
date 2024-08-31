<?php
$start_time = microtime(true);
$start_memory = memory_get_usage();
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Array to store AJAX Values
ob_start(); // Start output buffering
include "header.php";
ob_end_clean(); // Clear the buffer without sending output
// Login System
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);

    switch(true){
        // Signup
        case $data['action'] === 'signup':
            $email = $data['email'];
            $fname = ucfirst(strtolower($data['fname'])); // Capitalize the first letter and make the rest lowercase
            $lname = ucfirst(strtolower($data['lname'])); // Capitalize the first letter and make the rest lowercase
            $psw = $data['psw'];
            $cpsw = $data['cpsw'];

            // Initialize an array to hold the names of empty fields
            $emptyFields = [];

            // Check each field and push the field name to the array if it is empty
            if (empty($email)) $emptyFields[] = 'Email';
            if (empty($fname)) $emptyFields[] = 'First Name';
            if (empty($lname)) $emptyFields[] = 'Last Name';
            if (empty($psw)) $emptyFields[] = 'Password';
            if (empty($cpsw)) $emptyFields[] = 'Confirm Password';
            
            switch(true){
                case !empty($emptyFields):
                    if (count($emptyFields) > 1) {
                        // Separate the last item with an & and join the rest with commas
                        $lastField = array_pop($emptyFields);
                        $fieldsList = implode(', ', $emptyFields) . ' & ' . $lastField;
                    } else {
                        $fieldsList = $emptyFields[0]; // Only one field is missing
                    }
                    errorm($res, false, 'SE01: Missing Information', 'The following fields are required: ' . $fieldsList);
                break;

                case !filter_var($email, FILTER_VALIDATE_EMAIL):
                    errorm($res, false, 'SE02: Email Invalid', 'The email you\'ve entered is invalid, please check and try again.');
                break;

                case !preg_match('/^[A-Za-z]+$/', $fname) || !preg_match('/^[A-Za-z]+$/', $lname):
                    if (!preg_match('/^[A-Za-z]+$/', $fname) && !preg_match('/^[A-Za-z]+$/', $lname)) {
                        errorm($res, false, 'SE03: First & Last Name Invalid', 'The first and last names you\'ve entered are invalid, please enter Capital letters and small letters only.');
                    } else if (!preg_match('/^[A-Za-z]+$/', $fname)) {
                        errorm($res, false, 'SE03: First Name Invalid', 'The first name you\'ve entered is invalid, please enter Capital letters and small letters only.');
                    } else {
                        errorm($res, false, 'SE03: Last Name Invalid', 'The last name you\'ve entered is invalid, please enter Capital letters and small letters only.');
                    }
                break;

                case strlen($psw) < 8 || strlen($psw) > 20 || !preg_match('/[A-Za-z]/', $psw) || !preg_match('/[0-9]/', $psw):
                    $pswconditions = [];
                    if (strlen($psw) < 8 || strlen($psw) > 20) $pswconditions[] = '8-20 characters';
                    if (!preg_match('/[A-Z]/', $psw)) $pswconditions[] = 'at least one capital letter';
                    if (!preg_match('/[a-z]/', $psw)) $pswconditions[] = 'at least one small letter';
                    if (!preg_match('/[0-9]/', $psw)) $pswconditions[] = 'at least one number';
                    if (preg_match('/[^A-Za-z0-9]+/', $psw)) $pswconditions[] = 'no special characters';
                
                    // Create an ordered list for the password conditions
                    $pswconditionsList = '';
                    foreach ($pswconditions as $condition) {
                        $pswconditionsList .= '<li>' . htmlspecialchars($condition) . '</li>';
                    }
                
                    errorm($res, false, 'SE04: Password Invalid', 'The password you\'ve entered is invalid, please make sure it contains: <ol>' . $pswconditionsList . '</ol>');

                    if($psw !== $cpsw){
                        errorm($res, false, 'SE05: Passwords Don\'t Match', 'The passwords you\'ve entered do not match, please check and try again.');
                    }
                break;

                default:
                    // Prevent SQL Injection using prepared statements
                    $email = $conn->real_escape_string($email);
                    $fname = $conn->real_escape_string($fname);
                    $lname = $conn->real_escape_string($lname);
                    $psw = $conn->real_escape_string($psw);

                    // Check if the email is already in use
                    $sql = "SELECT * FROM account WHERE email = '$email'";
                    $result = $conn->query($sql);

                    if($result->num_rows > 0){
                        errorm($res, false, 'SE06: Email Already Exists', 'The email you\'ve entered is already in use, please try another one.');
                    }else{
                        $salt = bin2hex(random_bytes(16)); // Generate a random salt
                        $pepper = '+255625661901newagedesigntz'; // A secret pepper

                        // Combine password with salt and pepper before hashing
                        $hashedPassword = password_hash($salt . $psw . $pepper, PASSWORD_BCRYPT);

                        // Store the salt along with the hashed password
                        $sql = "INSERT INTO account (email, fname, lname, psw, salt) VALUES ('$email', '$fname', '$lname', '$hashedPassword', '$salt')";
                        if ($conn->query($sql) === TRUE) {
                            errorm($res, true, 'Signup Success', 'You\'ve successfully signed up, Please wait as we create your profile.');
                            // Set the session
                            $_SESSION['email'] = $email;
                            $_SESSION['fname'] = $fname;
                            $_SESSION['lname'] = $lname;

                        } else {
                            errorm($res, false, 'SE08: Error', 'An error occurred while signing up, please try again later.');
                        }
                    }
                break;
            }
        break;

        // Logout
        case $data['action'] === 'logout':
            session_unset();
            session_destroy();
            errorm($res, true, 'Logout Success', 'You\'ve successfully logged out.');
    }
}else{
}
$end_time = microtime(true);

// Calculate execution time
$execution_time = $end_time - $start_time;

$end_memory = memory_get_usage();
$peak_memory = memory_get_peak_usage();
// Display the current response error message along with the status

// errorm($res,$res['errormsg']['success'],$res['errormsg']['head'],$res['errormsg']['message'].'<br><br>Execution time: ' . round($execution_time, 3) . ' seconds<br>Memory used: ' . round(($end_memory - $start_memory) / 1024 / 1024, 3) . ' MBs<br>Peak memory usage: ' . round($peak_memory / 1024 / 1024, 3) . ' MBs');


echo json_encode($res);