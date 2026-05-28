<?php

header("Content-Type: application/json");

/* =========================
   MYSQL
========================= */

$host = "sql110.infinityfree.com";
$user = "if0_41479675";
$pass = "s1st3m4s2026";
$db   = "if0_41479675_scores";

$conn = new mysqli($host, $user, $pass, $db);

if($conn->connect_error){

    die(json_encode([]));

}

/* =========================
   TOP 3
========================= */

$sql = "
SELECT nombre,puntos
FROM scores
ORDER BY puntos DESC
LIMIT 3
";

$result = $conn->query($sql);

$data = [];

while($row = $result->fetch_assoc()){

    $data[] = $row;

}

echo json_encode($data);

$conn->close();

?>