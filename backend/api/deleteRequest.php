<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$CommentAdminForHistory = $data["CommentAdminForHistory"];

//получение selected_schedule_id
$stmt = $pdo->prepare("SELECT selected_schedule_id FROM requests WHERE id = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();
$request = $stmt->fetch(PDO::FETCH_ASSOC);


//удвление занятости requests
$sql = "DELETE FROM requests WHERE id = :id";

$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $id);

$stmt->execute();


//удвление занятости schedule
$sql2 = "UPDATE schedule SET is_busy = 0 WHERE id = :id";
$stmt2 = $pdo->prepare($sql2);
$stmt2->bindParam(':id', $request['selected_schedule_id']);
$stmt2->execute();

//добавление Sequest_history
$sql3 = "INSERT INTO request_history (request_id, action, comment)
VALUES (:id, :action, :comment)";
$stmt3 = $pdo->prepare($sql3);
$action = "DELETE";
$stmt3->bindParam(':id', $id);
$stmt3->bindParam(':action', $action);
$stmt3->bindParam(':comment', $CommentAdminForHistory);
$stmt3->execute();



echo json_encode([
    "success" => true
]);