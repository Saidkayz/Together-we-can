<?php
//YOU MPESA API KEYS
$consumerKey = "HiHbGWAfDa4cykeIyMo1xWCUNHAdUvXGx9dwHkbo84DLp0o4"; //Fill with your app Consumer Key
$consumerSecret = "AalSP9gNs9U4g6uiH7wltuzAEMoo2aZA4vRuqGL3FKAs2DsC8FGQi51TkpB7lm7W"; //Fill with your app Consumer Secret
//ACCESS TOKEN URL
$access_token_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
$headers = ['Content-Type:application/json; charset=utf8'];
$curl = curl_init($access_token_url);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_HEADER, FALSE);
curl_setopt($curl, CURLOPT_USERPWD, $consumerKey . ':' . $consumerSecret);
$result = curl_exec($curl);
$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
$result = json_decode($result);
echo $access_token = $result->access_token;
curl_close($curl);