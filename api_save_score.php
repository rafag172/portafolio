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

    die(json_encode([
        "success" => false,
        "message" => "Error conexion"
    ]));

}

/* =========================
   RECIBIR JSON
========================= */

$data = json_decode(file_get_contents("php://input"), true);

if(!$data){

    die(json_encode([
        "success" => false,
        "message" => "No llegaron datos"
    ]));

}

$nombre = trim($data["nombre"]);
$puntos = intval($data["puntos"]);

/* VALIDACION */

if($nombre == ""){

    die(json_encode([
        "success" => false,
        "message" => "Nombre vacío"
    ]));

}

/* =========================
   INSERT
========================= */

$stmt = $conn->prepare("
INSERT INTO scores(nombre,puntos)
VALUES(?,?)
");

$stmt->bind_param("si", $nombre, $puntos);

if($stmt->execute()){

    echo json_encode([
        "success" => true,
        "message" => "Score guardado"
    ]);

}else{

    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);

}

$stmt->close();
$conn->close();

?>