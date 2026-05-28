<?php

/* =========================
   MYSQL
========================= */

$host = "sql110.infinityfree.com";
$user = "if0_41479675";
$pass = "s1st3m4s2026";
$db   = "if0_41479675_scores";

$conn = new mysqli($host, $user, $pass, $db);

if($conn->connect_error){

    die("ERROR MYSQL");

}

/* =========================
   DATOS
========================= */

$nombre = $_GET['nombre'] ?? '';
$puntos = $_GET['puntos'] ?? 0;

$nombre = trim($nombre);
$puntos = intval($puntos);

/* DEBUG */

echo "Nombre: " . $nombre . "<br>";
echo "Puntos: " . $puntos . "<br>";

if($nombre == ''){

    die("Nombre vacío");

}

/* =========================
   INSERT
========================= */

$sql = "
INSERT INTO scores(nombre,puntos)
VALUES('$nombre','$puntos')
";

if($conn->query($sql)){

    echo "OK";

}else{

    echo "ERROR SQL";

}

$conn->close();

?>