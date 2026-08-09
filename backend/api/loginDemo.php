<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();



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


$_SESSION["user"] = [
    "id" => $user["id"],
    "name" => $user["name"],
    "role" => $user["role"]
];

echo json_encode([
    "success" => true,
    "user" => $_SESSION["user"]
]);

header("Content-Type: application/json; charset=utf-8");

