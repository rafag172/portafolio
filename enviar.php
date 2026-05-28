<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $nombre = htmlspecialchars($_POST['nombre']);
    $correo = htmlspecialchars($_POST['correo']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    $destino = "rafaelromeroguzman172@gmail.com.com"; 

    $asunto = "Nuevo mensaje de portafolio - $nombre";

    $contenido = "
    Nombre: $nombre\n
    Correo: $correo\n
    Mensaje: $mensaje
    ";

    $headers = "From: $correo";

    if(mail($destino, $asunto, $contenido, $headers)){
        echo "Mensaje enviado correctamente";
    } else {
        echo "Error al enviar mensaje";
    }

}

?>