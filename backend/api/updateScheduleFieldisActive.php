<?php
require_once "../auth/auth.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';



requireRole(["employee", "admin"]);

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$isActive = $data['isActive'];

$stmt = $pdo->prepare("UPDATE schedule SET is_active = ? WHERE id = ?");
$stmt->execute([$isActive, $id]);

echo json_encode([
    "success" => true
]);