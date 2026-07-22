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

$sql = "DELETE FROM requests WHERE id = :id";

$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $id);
$stmt->execute();
echo json_encode([

    "success" => true

]);