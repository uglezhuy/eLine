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
$roleID = $data["roleID"];

$stmt = $pdo->prepare("
SELECT *
FROM users
WHERE id = :roleID
");
$stmt->bindValue(':roleID', $roleID, PDO::PARAM_INT);
$stmt->execute();
$user = $stmt->fetch();



header("Content-Type: application/json; charset=utf-8");

echo json_encode($user);